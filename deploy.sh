#!/bin/zsh

CDN_PURGE='https://purge.jsdelivr.net'
GH_ACCOUNT='reniie'
GH_REPO='four2'
GH_BRABCH='assets'
URL_PREFIX=$CDN_PURGE'/gh/'$GH_ACCOUNT'/'$GH_REPO'@'$GH_BRABCH'/'

# log level
ERROR='\x1b[31mERROR\x1b[0m'
INFO='\x1b[32mINFO \x1b[0m'
WARN='\x1b[33mWARN \x1b[0m'

echo "\n$INFO [ >> GIT ADD, STATUS, COMMIT ]"
echo "$INFO jsdeliver project dir: `pwd`"
git add .
git status
git commit -m "update." | tee /tmp/git.out
# 检查方式 1: 检查是否有文件提交
if [ -n "`grep 'nothing to commit, working tree clean' /tmp/git.out`" ]; then
    echo "$WARN nothing to update. don't refresh cdn." 
    exit 1;
fi

echo "\n$INFO [ >> GIT PUSH ]"
git push

echo "\n$INFO [ >> PURGE JSDELIVER CDN ]"
FILES=`git log -z --name-only -1 | tr '\000' " " | tail -1f`
for ITEM in `echo $FILES`; do
    echo "$INFO purge: $URL_PREFIX$ITEM"
done
