class userDetail{

    constructor(phoneNumber, displayName, photoURL, direction, type, uid){
        this.phoneNumber = phoneNumber;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.direction = direction;
        this.type = type;
        this.uid = uid;
    }

    get usarDet(){
        return {
            "phoneNumber": this.phoneNumber,
            "displayName": this.displayName,
            "photoURL": this.photoURL,
            "direction": this.direction,
            "type": this.type,
            "uid": this.uid
        }
    }
}

module.exports = userDetail;