# Hacks and modifications

## Building a release

Branches:

- master (normal version)
- ie10 (browserlist patched for IE10+)

Example for builing 17.0.0 for IE10:

```bash
# configure original repository
git remote add upstream https://github.com/swimlane/ngx-datatable.git
# merge desired version
git checkout ie10
git fetch upstream
git merge 17.0.0
git push
# build the package
npm install
npm run package
# push release as branch
cp -R .git dist/swimlane/ngx-datatable/
cd dist/swimlane/ngx-datatable/
git checkout --orphan release-17.0.0-ie10
git add .
git commit -m 'Release 17.0.0-ie10'
git push origin release-17.0.0-ie10
```
