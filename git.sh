while getopts m:t: flag
do
    case "${flag}" in
        m) message=${OPTARG};;
        t) task=${OPTARG};;

    esac
done
if [ $task = "c" ]
then
  git add .
  git commit -m $message
  git push
  tree=$(git branch --show-current)
  echo "Commited files with message \"$message\" to branch $tree"
fi
