function Effect() {
    var self = this;

    this.meshes = [
        { file: "BeautyFace.bsm2", anims: [
            { a: "Take 001", t: 3333 },
        ] },
        { file: "Elvis.bsm2", anims: [
            { a: "Take 001", t: 3333 },
        ] },
    ];

    this.play = function() {
        var now = (new Date()).getTime();
        for(var i = 0; i < self.meshes.length; i++) {
            if(now > self.meshes[i].endTime) {
                self.meshes[i].animIdx = (self.meshes[i].animIdx + 1)%self.meshes[i].anims.length;
                Api.meshfxMsg("animOnce", i, 0, self.meshes[i].anims[self.meshes[i].animIdx].a);
                self.meshes[i].endTime = now + self.meshes[i].anims[self.meshes[i].animIdx].t;
            }
        }

        // if(isMouthOpen(world.landmarks, world.latents)) {
        //  Api.hideHint();
        // }
    };

    this.init = function() {
        Api.meshfxMsg("spawn", 2, 0, "!glfx_FACE");

        Api.meshfxMsg("spawn", 0, 0, "BeautyFace.bsm2");
        // Api.meshfxMsg("animOnce", 0, 0, "Take 001");

        Api.meshfxMsg("spawn", 1, 0, "Elvis.bsm2");
        // Api.meshfxMsg("animOnce", 1, 0, "Take 001");

        for(var i = 0; i < self.meshes.length; i++) {
            self.meshes[i].animIdx = -1;
            self.meshes[i].endTime = 0;
        }

        self.faceActions = [self.play];
        // Api.showHint("Open mouth");
        Api.playSound("music.ogg", true, 1);
        Api.showRecordButton();
    };

    this.restart = function() {
        Api.meshfxReset();
        Api.stopSound("music.ogg");
        self.init();
    };

    this.faceActions = [];
    this.noFaceActions = [];

    this.videoRecordStartActions = [];
    this.videoRecordFinishActions = [];
    this.videoRecordDiscardActions = [this.restart];
}

configure(new Effect());