<h1>tagAction - v1.2</h1>
Run actions by tag
<p>Developed by Wallace Rio <wallrio@gmail.com></p>
<hr>

<h3>Cross-Browser</h3>
<p>Tested on Firefox 45 / IE 8 / Opera 12 / Chrome 38 / Safari 5</p>

<h3>Use</h3>
<p>Insert script tag and link tag into your head document html</p>

	<script type="text/javascript" src="tagaction.js"></script>



<hr>

<h2>Examples</h2>

<h3>Tag run function</h3>
<p>Execute a javascript code on click tag anchor (a):</p>
    
    <a class='btdefault' 
                  data-tagaction="click" 
                  data-tagaction-source="this"         
                  data-tagaction-action = "alert('clicked!!')"            
              >Click here to run Example</a>


<br>
<br>

<h2>Examples</h2>

<h3>Tag run function</h3>
<p>Execute a javascript code on mouseover tag anchor (a):</p>
  
    <a class='btdefault' 
                  data-tagaction="mouseover" 
                  data-tagaction-source="this"         
                  data-tagaction-action = "alert('clicked!!')"            
              >Click here to run Example</a>



<br>
<br>

<h3>Tag run function with callback</h3>
<p>Execute a javascript code on click tag (div) with callback:</p>

    <a class='btdefault' 
                  data-tagaction="click" 
                  data-tagaction-source="this"         
                  data-tagaction-action = "alert('clicked!!')"    
                  data-tagaction-callback="function(){alert('this callback: '+this.innerHTML);}"         
              >Click here to run Example</a>




<br>
<br>

<h3>Tag run function with callback by mode toggle</h3>
<p>Execute a javascript code on click tag (div) with callback by mode toggle:</p>

    <a class='btdefault' 
                  data-tagaction="click.toggle" 
                  data-tagaction-source="this"                       
                  data-tagaction-callback="function(){alert('toggle 1');}"                  
                  data-tagaction-callback-toggle="function(){alert('toggle 2');}"            
              >Click here to run Example</a>




<br>
<br>

<h3>Tag run function with only one action with reserved word (toggle)</h3>
<p></p>

    <a class='btdefault' 
                  data-tagaction="click.toggle" 
                  data-tagaction-source="this"         
                  data-tagaction-action = "alert('clicked!! - @toggle'); "             
              >Click here to run Example</a>



<br>
<br>

<h3>Get content extern and show on div element</h3>
<p></p>
  
    <a class='btdefault' 
                  data-tagaction="click.toggle" 
                  data-tagaction-source="this"         
                  data-tagaction-action = "alert('clicked!! - @toggle'); "             
              >Click here to run Example</a>





<br>
<br>

<h3>Run action on other element</h3>
<p></p>

    <a class='btdefault' 
                  data-tagaction="click"           
                    data-tagaction-target="[name='otherelement']"                
              >Click here to run Example</a>



<hr>

    <h2>API</h2>

    <strong>data-tagaction =</strong> type of action (click,dblclick , mousemove, click.toggle, dblclick.toggle)<br>
    <strong>data-tagaction-source =</strong> element source of action (this OR id of element)<br>
    <strong>data-tagaction-target =</strong> element destination of action (id of element)<br>
    <strong>data-tagaction-action =</strong> action on element source ( function OR pre-defined action)<br>
    <strong>data-tagaction-callback =</strong> action run after action<br>
    <strong>data-tagaction-callback-toggle =</strong> action run after action (only mode toggle)
