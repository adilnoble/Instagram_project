from fastapi import FastAPI

from users import router as user_router
from profiles import router as profile_router
from profile_stats import router as profile_stats_router
from follows import router as follows_router
from posts import router as posts_router
from post_likes import router as post_likes_router
from post_comments import router as post_comments_router
from comment_replies import router as comment_replies_router
from reels import router as reels_router
from reel_likes import router as reel_likes_router
from reel_comments import router as reel_comments_router
from reel_comment_replies import router as reel_comment_replies_router
from stories import router as stories_router
from messages import router as messages_router
from story_views import router as story_views_router
from notifications import router as notifications_router

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