git filter-branch --force --index-filter \
'git rm -r --cached --ignore-unmatch thumbs/*.x1200.jpg' \
--prune-empty --tag-name-filter cat -- --all 
