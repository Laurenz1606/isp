import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { decodeToken } from "../Functions/AuthFunctions";

export default function AdminProtect({ children }) {
  const history = useHistory();

  useEffect(() => {
    const x = async () => ((await decodeToken()).admin ? "" : history.goBack());
    x();
  }, [history]);

  return children;
}
