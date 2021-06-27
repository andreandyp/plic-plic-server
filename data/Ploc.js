class Ploc {
    constructor(userId, replyId, message, dateTime, hashtags, media, location, replies, mentions, likes, replocs) {
        this.userId = userId;
        this.replyId = replyId;
        this.message = message;
        this.dateTime = dateTime;
        this.hashtags = hashtags;
        this.media = media;
        this.location = location;
        this.replies = replies;
        this.mentions = mentions;
        this.likes = likes;
        this.replocs = replocs;
    }
}

module.exports = Ploc;