from fastapi import FastAPI

from Users import (
    router as user_router,
    profile_router,
    profile_stats_router,
    follows_router,
    posts_router,
    post_likes_router,
    post_comments_router,
    comment_replies_router,
    reels_router,
    reel_likes_router,
    reel_comments_router,
    reel_comment_replies_router,
    stories_router,
    story_views_router,
    messages_router,
    notifications_router
)

app = FastAPI(
    title="Instagram Clone API"
)

app.include_router(user_router)
app.include_router(profile_router)
app.include_router(profile_stats_router)
app.include_router(follows_router)
app.include_router(posts_router)
app.include_router(post_likes_router)
app.include_router(post_comments_router)
app.include_router(comment_replies_router)
app.include_router(reels_router)
app.include_router(reel_likes_router)
app.include_router(reel_comments_router)
app.include_router(reel_comment_replies_router)
app.include_router(stories_router)
app.include_router(messages_router)
app.include_router(story_views_router)
app.include_router(notifications_router)

@app.get("/")
async def root():
    return {
        "message": "Instagram Clone API Running"
    }