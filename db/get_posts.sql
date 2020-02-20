SELECT * FROM post
WHERE user_id = $1
ORDER BY post_id DESC