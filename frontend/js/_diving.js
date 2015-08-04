(function(window, undefined){
	var dive = dive || {
		options: {
			server: '',
			api: 'api/OtterDiving/syncRecords',	
		},
		vardosync: undefined,	//timeout varable
		records: [],
		//---- add a record to tmp array by developer ---------------------------------------------
		addRecord: function(userID, targetID, actDesc, actData){
			var tmp,
				dtime = new Date();
			tmp.uid = userID;
			tmp.tid = targetID;
			tmp.desc = actDesc;
			tmp.data = actData;
			tmp.dtime = dtime.getFullYear() + '-' + (dtime.getMonth() + 1) + '-' + dtime.getDate() + ' ' + dtime.getHours() + ':' + dtime.getMinutes() + ':' + dtime.getSeconds();
			//tmp.dtime = dtime.toJSON();	//IE9
			records.push(tmp);
		},
		//---- set Timeout ------------------------------------------------------------------------
		syncRecords:function(){
			if(Dive.vardosync)
				clearTimeout(Dive.vardosync);
			Dive.vardosync = setTimeout(Dive.doSyncRecords,	1500);
		},
		//---- upload 2 server --------------------------------------------------------------------
		doSyncRecords: function(){
			if(Dive.records.length == 0){
				Dive.syncRecords();
				return;
			}
			
			$.ajax({
				method: 'POST',
                url: Dive.options.server + Dive.options.api,
				data: { 'records' : Dive.records},
                beforeSend: function (xhr) {
                    Comm.setHeader(xhr);
				}
			}).done(function (data) {
                if(Comm.isSuccess(data)){
					Dive.records = [];					
				}
				Dive.syncRecords();
            });
		}
	};
	
	window.Dive = dive;
})(window);

Dive.syncRecords();