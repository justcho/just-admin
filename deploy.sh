# 确保脚本抛出遇到的错误
set -e

# 删除文件需要根据实际打包的目录进行删除
rm -rf /dist/

# 生成静态文件
pnpm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'justcho.life' >CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:justcho/just-admin.git master:page

cd -