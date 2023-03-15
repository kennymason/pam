#!/bin/sh

GIT=`which git`
REPO_DIR=/home/username/Sites/git/repo/
cd ${REPO_DIR}
${GIT} add --all .
${GIT} commit -m "Auto-commit"
${GIT} push git@bitbucket.org:username/repo.git master
