/**
 * tagAction v1.2 - 09/08/2016
 * define action on tag html
 *
 * developed by Wallace Rio <wallrio@gmail.com>
 * wallrio.com
 * 
 * tested on firefox/chrome/opera/ie8/safari
 *
 * Optional jQuery
 * 
 */




var tagaction = (function(obj){
	obj = obj || window;	
	
	var contBox = 0;

	tagaction_loads = [];

	var Functions = {		

		/**
		 * convert object to query string
		 * @param  {[type]} json [description]
		 * @return {[type]}      [description]
		 */
		objectToQueryString:function(json) {
			var queryString = '';
			var seperator = '';
			var index = 0;
			for(key in json){
				if(index>0)
					seperator = '&'
				queryString += seperator+key+'='+encodeURIComponent(json[key]);
				index++;
			}
			

			return {'string':queryString,'count':index};
		},
		/**
		 * ajax connection
		 * @param  {[type]} option [similar to jquery]
		 */
		ajax:function(option){
			
			var type = option['type'] || "GET";
			var url = option['url'] || null;
			var data = option['data'] || null;
			var success = option['success'] || null;
			var progress = option['progress'] || null;
			var sync = option['sync'] || true;
			var files = option['files'] || null;
			var xmlhttp =[];			
			var count = contBox;
			var formdata = null;
			
			
			// url = url.toLowerCase();
			type = type.toLowerCase();

			try{
				xmlhttp[count] = new XMLHttpRequest();
			}catch(ee){
				try{
					xmlhttp[count] = new ActiveXObject("Msxml2.XMLHTTP");
				}catch(e){
					try{
						xmlhttp[count] = new ActiveXObject("Microsoft.XMLHTTP");
					}catch(E){
						xmlhttp[count] = false;
					}
				}
			}		

			if(typeof data == 'object'){											
				dataString = Functions.objectToQueryString(data);				
			}

			if(type == 'get')
				url = url + '?'+dataString.string;
			
			
			
			xmlhttp[count].open(type, url,sync);	
	
			 if(type == 'post' && files == null)		
				xmlhttp[count].setRequestHeader("Content-type","application/x-www-form-urlencoded");
	
			xmlhttp[count].onreadystatechange=function(response) {	

				if (xmlhttp[count].readyState==4){		      										
					var resposta = xmlhttp[count].responseText;		            
					if(success)
						success(resposta);		           
				}
			}

			xmlhttp[count].upload.onprogress = function(e){
				if(progress)
					progress(e.loaded,e.total,Math.ceil((e.loaded / e.total) * 100))		
			};


			if(files != null){
				formdata = new FormData();

				for(key in files){
					var nowFiles = files[key];					
					var inputfiles = nowFiles.files;						
					if (inputfiles && inputfiles != null && inputfiles.length > 0) {													
						for (var i = 0; i <= inputfiles.length-1; i++) {							
					        formdata.append(key+'_'+inputfiles[i].name, inputfiles[i]);
					    }												
					}
				}
		
				for(key in data){
					formdata.append(key, data[key]);
				}
			}

			if(type == 'post')	
				if(files == null)	
					xmlhttp[count].send(dataString.string); 
				else
					xmlhttp[count].send(formdata); 
			else
				xmlhttp[count].send(); 
		},
		// check if browser is modern
		browserModern:function(){
			if(document.addEventListener)
				return true;
			else if(document.attachEvent)
				return false;
		},
		addEvent:function(objs,event,callback,mode,elem2,table){
			
			if(mode == undefined)
				mode = true;

			if(objs == undefined)
				objs = window; 

			if(typeof objs == 'string')
				objs = document.querySelector(objs);

			if(objs.addEventListener){ 				
				return objs.addEventListener(event,function(){
					if(callback)
						callback(objs,elem2,table);
					return false;
				},mode); 
			}else if(objs.attachEvent){					
				return objs.attachEvent('on'+event,function(){
					if(callback)
						callback(objs,elem2,table);
					return false;
				}); 
			}
		},
		load:function(callback){
			if(callback)
			tagaction_loads[tagaction_loads.length+1] = callback;		
		},
		loadpre:function(callback){			
			if(callback == undefined) return;
							
			Functions.addEvent(obj,'load',function(){
				return callback(obj);
			});					
		},
		action:function(elementSrc,element,action,callback){
			
			var actArray = action.split('::');			
			var act = actArray[0] || 'view';
			var target = actArray[1] || null;
			

			if(act == 'get.url'){
				
				Functions.ajax({
					url:target,
					success:function(response){
						
						var elementArray = document.querySelectorAll(element);
						for(var i=0;i<elementArray.length;i++){
							elementArray[i].innerHTML = response;
						}
						
						if(callback){						
							var funcStr = "var func = "+callback;
							eval(funcStr);
							func.call(elementSrc,element);							
						}
					}
				});
			
				return true;
			}
			return false;
		}
	}


	Functions.loadpre(function(){
	
		for(var i = 1;i<= tagaction_loads.length-1;i++){					
			tagaction_loads[i]();
		}

		var tagactionAction = document.querySelectorAll('[data-tagaction]');		
		
		for(var i = 0;i<= tagactionAction.length;i++){
			if(tagactionAction[i] == undefined) continue;
			var modeAction = tagactionAction[i].getAttribute('data-tagaction') || 'click';
			var callback = tagactionAction[i].getAttribute('data-tagaction-callback') || null ;
			var callbacktoggle = tagactionAction[i].getAttribute('data-tagaction-callback-toggle');
			var sourceElement = tagactionAction[i].getAttribute('data-tagaction-source') || 'this';
			var targetElement = tagactionAction[i].getAttribute('data-tagaction-target');
			var actionElement = tagactionAction[i].getAttribute('data-tagaction-action');

				if(sourceElement == 'this'){			
					sourceElement = tagactionAction[i];
				}else{	
				    sourceElement = document.querySelector(sourceElement);
					sourceElement.setAttribute('data-tagaction',modeAction);		
					sourceElement.setAttribute('data-tagaction-callback',callback);		
					sourceElement.setAttribute('data-tagaction-callback-toggle',callbacktoggle);		
					sourceElement.setAttribute('data-tagaction-source',sourceElement);		
					sourceElement.setAttribute('data-tagaction-target',targetElement);		
					sourceElement.setAttribute('data-tagaction-action',actionElement);		
							
				}
		
				var modeVariant = modeAction.split('.');
				if(modeVariant.length > 1){
					modeAction = modeVariant[0];
					var clickmode = modeVariant[1];
					sourceElement.setAttribute('data-tagaction-mode',clickmode);		
					sourceElement.setAttribute('data-tagaction-toggle','0');			
				}
				
				
				

				Functions.addEvent(sourceElement,modeAction,function(e,targetElement){																																			
					
					var modeAction = e.getAttribute('data-tagaction') || 'click';
					var callback = e.getAttribute('data-tagaction-callback') || null;

					var callbacktoggle = e.getAttribute('data-tagaction-callback-toggle');
					var action = e.getAttribute('data-tagaction-action');
					var clickmode = e.getAttribute('data-tagaction-mode');
					var targetElement = e.getAttribute('data-tagaction-target');
					var toggleStatus = e.getAttribute('data-tagaction-toggle') || null;
					
					var modeVariant = modeAction.split('.');
					if(modeVariant.length > 1){
						modeAction = modeVariant[0];
					}


					if(clickmode == 'toggle'){
						
						if(e.getAttribute('data-tagaction-toggle') == '0' ){
							e.setAttribute('data-tagaction-toggle','1');						
						}else{
							e.setAttribute('data-tagaction-toggle','0');	
							if(callbacktoggle != null && callbacktoggle != 'null'){
								var funcStr = "var func = "+callbacktoggle;
								eval(funcStr);
								func.call(e,targetElement);
							}

							
						}
					}
					
					

					if(action != null && action != 'null'){
						var resultAction = Functions.action(e,targetElement,action,callback);

						if( resultAction ==true)						
							return false;
						
						action = action.replace('@toggle',toggleStatus);

						var funcStr = "var func = "+action;						
							eval(funcStr);
						

						if(typeof func == 'function'){
							var resultFunc = func.call(e,targetElement);
							if(resultFunc == false)						
								return false;
						}
					
					}
					
					
					if( toggleStatus == null || toggleStatus == '0' ){
						

						if(typeof jQuery == 'function'){

							var returnate = $(targetElement).trigger( modeAction );
							var funcStr = "var func = "+callback;
							eval(funcStr);
							func.call(e,targetElement);
							return returnate;
						}else{
								
						
							 if(targetElement != null){

								var returnate = document.querySelector(targetElement).click();	
									var funcStr = "var func = "+callback;								
									eval(funcStr);
									func.call(e,targetElement);
								return returnate;													
							}else {
								
									var funcStr = "var func = "+callback;										
									eval(funcStr);
									func.call(e,targetElement);
								
							}
						}
					}else{

					}
					
				},null,targetElement);	

				
		
			
		}

		

				
	});

	return Functions;	

});

window.tagaction();



