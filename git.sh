while getopts m:t: flag
do
    case "${flag}" in
        m) message=${OPTARG};;
        t) task=${OPTARG};;

    esac
done

if [ ${task} = ""]
then
echo "Please specify task"
echo "Example: ./git.sh -t [TASK]"
exit 1
fi

if [ ${task} = "c" ]
then
  git add .>/dev/null
  git commit -m $message>/dev/null
  git push>/dev/null
  branch=$(git branch --show-current)>/dev/null
  echo "Commited files with message \"$message\" to branch $branch"
fi
