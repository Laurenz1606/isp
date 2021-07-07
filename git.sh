while getopts m:t: flag
do
    case "${flag}" in
        m) message=${OPTARG};;
        t) task=${OPTARG};;

    esac
done

#check if task is specified
if [ ${task} = ""]
then
echo "Please specify task"
echo "Example: ./git.sh -t [TASK]"
exit 1
fi

#commit to current branch
if [ ${task} = "c" ]
then
  git add . > /dev/null 2>&1
  git commit -m $message > /dev/null 2>&1
  git push > /dev/null 2>&1
  branch=$(git branch --show-current) > /dev/null 2>&1
  echo "Commited files with message \"$message\" to branch $branch"
fi
