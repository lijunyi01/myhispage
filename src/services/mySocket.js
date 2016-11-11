import io from 'socket.io-client';

const mysocket = {
    umid: '',
    token: '',
    httptype: 'http://',
    siteip: '',
    siteport: '',
    socket: null,
    sendName: 'Request',
    sendParam: {},
    callback: {},
    onName: 'AckReq',

    init: function (siteip,siteport,umid,token) {
        if (this.siteip == '') {
            this.siteip = siteip;
            this.siteport = siteport;
            this.umid = umid;
            this.token = token;
        }
    },

    serial: function(){
        return 'serial_'+new Date().getTime();
    },
    connect: function(){
        var socketUrl = this.httptype+this.siteip+':'+this.siteport+'/?umid='+this.umid+'&token='+this.token;
        // console.log(socketUrl);
        this.socket = io.connect(socketUrl);

        this.on();
    },
    emit: function(functionName,sendjson,callback){
        if(this.socket == null) this.connect();

        var serial = this.serial();
        this.callback['"'+serial+'"'] = callback;

        this.sendParam['umid'] = this.umid;
        this.sendParam['serial'] = serial;
        this.sendParam['functionName'] = functionName;
        this.sendParam['generalParam'] = JSON.stringify(sendjson);

        // console.log('sendStr: -');
        // console.log(this.sendParam);

        this.socket.emit(this.sendName,this.sendParam);

        // console.log('socket send ok ... ');
        //
        // console.log(this.callback);
        // console.log('');
    },
    on: function(){
        this.socket.on(this.onName,function(date){
            //console.log(date);

            var serial = date.serial;

            // console.log(this.callback);

            // console.log(this.callback['"'+serial+'"']);
            this.callback['"'+serial+'"'](date);

            delete this.callback['"'+serial+'"'];

            // console.log(this.callback);
            // console.log('');
        }.bind(this));

        this.socket.on('connect',function(){
            // console.log('socket connect ok ...');
            // console.log('');
        });

//		this.socket.on('disconnect', function() {
//		    console.log('与服务其断开');
//		});
//
//		this.socket.on('reconnect', function() {
//		    console.log('重新连接到服务器');
//		});
    }
};

export default mysocket;