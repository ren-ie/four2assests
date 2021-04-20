#!/bin/zsh

CDN_PURGE='https://purge.jsdelivr.net'
GH_ACCOUNT='reniie'
GH_REPO='four2'
GH_BRABCH='assets'

# log level
ERROR='\x1b[31mERROR\x1b[0m'
INFO='\x1b[32mINFO \x1b[0m'
WARN='\x1b[33mWARN \x1b[0m'

echo "\n$INFO [ >> GIT ADD, STATUS, COMMIT ]"
echo "$INFO jsdeliver project dir: `pwd`"
git add .
git status | tee /tmp/git.out
git commit -m "update."

echo "\n$INFO [ >> GIT PUSH ]"
git push

echo "\n$INFO [ >> PURGE JSDELIVER CDN ]"
# 检查方式 1: 检查是否有文件提交
if [ -n "`grep 'nothing to commit, working tree clean' /tmp/git.out`" ]; then
    echo "$WARN nothing to update. don't refresh cdn." 
    exit 1;
fi
FILES=`awk -F ': ' '{print $2}' /tmp/git.out | tr '\n' ' '`
# 把循环体括起来，后加一个 & 符号，让系统起一个新的线程后台运行命令, wait 等待任务执行完成再继续
# https://taoyan.netlify.app/post/2020-01-02.多线程并行计算
for ITEM in `echo ${FILES//  /}`; do {
    URL="$CDN_PURGE/gh/$GH_ACCOUNT/$GH_REPO@$GH_BRABCH/$ITEM"
    echo "$INFO purge: $URL"
    curl --ssl "$URL"
} &
done
wait
