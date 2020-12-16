class AskStore{

    constructor(cid, displayName, direction, costo, fecha, estado, sid, pid){
        this.cid = cid;
        this.displayName = displayName;
        this.direction = direction;
        this.costo = costo;
        this.fecha = fecha;
        this.estado = estado;
        this.sid = sid;
        this.pid = pid;
    }

    get askStore(){
        return {
            "cid": this.cid,
            "displayName": this.displayName,
            "direction": this.direction,
            "costo": this.costo,
            "fecha": this.fecha,
            "estado": this.estado,
            "sid": this.sid,
            "pid": this.pid
        }
    }
}

module.exports = AskStore;