while getopts m: flag
do
    case "${flag}" in
        m) message=${OPTARG};;
    esac
done
git add .
git commit -m \$username\"
git push