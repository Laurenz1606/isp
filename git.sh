while getopts m: flag
do
    case "${flag}" in
        m) message=${OPTARG};;
    esac
done
git add .
git commit -m $message
git push

tree=$(git branch --show-current)
echo "Commited files with message \"$message\" to branch $tree"
