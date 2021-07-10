import React, { useCallback, useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import './styles.css';
import DocumentHeaderButton from '../Components/Documents/DocumentHeaderButton';
import SavePresetModal from '../Components/Documents/SavePresetModal';
import { ChevronLeftIcon, SaveIcon } from '@heroicons/react/outline';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '../Functions/ReactRouterDomHooks';

const TOOLBARS_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: 'ordered' }, { list: 'bullet' }],
	['bold', 'italic', 'underline'],
	[{ color: [] }, { background: [] }],
	[{ script: 'sub' }, { script: 'super' }],
	[{ align: [] }],
	['image', 'blockquote', 'code-block'],
	['clean'],
];

export default function Document() {
	const { id: paramid } = useParams();
	const backPath = useQuery().get('path');
	const [quill, setQuill] = useState();
	const [name, setName] = useState('Dokument');
	const [socket, setSocket] = useState();
	const [ModalIsOpen, setModalIsOpen] = useState(false);
	const history = useHistory();

	useEffect(() => {
		document.title = document.config.title.replace('[SITE]', name);
	}, [name]);

	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return;

		wrapper.innerHTML = '';
		const editor = document.createElement('div');
		wrapper.append(editor);
		const q = new Quill(editor, {
			theme: 'snow',
			modules: { toolbar: TOOLBARS_OPTIONS },
		});
		q.disable();
		q.setText('Loading...');
		setQuill(q);
	}, []);

	useEffect(() => {
		const s = io('https://isp-socket.mk-return.de');
		setSocket(s);

		return () => {
			s.disconnect();
		};
	}, []);

	useEffect(() => {
		if (socket == null || quill == null) return;

		socket.once('document/load', (document) => {
			if (document.err) {
				history.push('/documents');
			}
			setName(document.name);
			quill.setContents(document.data);
			quill.enable();
		});

		socket.emit('document/get', paramid);
	}, [socket, quill, history, paramid]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handler = (delta) => {
			quill.updateContents(delta);
		};
		socket.on('document/recive', handler); 
		return () => {
			socket.off('document/recive', handler);
		};
	}, [socket, quill]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handler = (delta, oldDelta, source) => {
			if (source !== 'user') return;
			socket.emit('document/change', delta);
			socket.emit('document/save', quill.getContents());
		};
		quill.on('text-change', handler);

		return () => {
			quill.off('text-change', handler);
		};
	}, [socket, quill]);

	return (
		<>
			<div className="flex-col flex-1" style={{ maxWidth: '100vw' }}>
				<div className="print-none flex items-center md:space-x-5 flex-wrap justify-center md:justify-start p-5">
					<DocumentHeaderButton
						action={() => history.push('/documents?path=' + backPath)}
						icon={<ChevronLeftIcon className="w-8 h-8" />}
						text="Zurück"
					/>
					<DocumentHeaderButton
						action={() => setModalIsOpen((open) => !open)}
						icon={<SaveIcon className="w-8 h-8" />}
						text="Vorlage speichern"
					/>
					<h1 className="break-all text-xl font-medium">{name !== null ? name : 'Loading...'}</h1>
				</div>
				<div className="container-text" ref={wrapperRef}></div>
			</div>
			{ModalIsOpen ? <SavePresetModal id={paramid} isOpen={ModalIsOpen} setIsOpen={setModalIsOpen} /> : ''}
		</>
	);
}
