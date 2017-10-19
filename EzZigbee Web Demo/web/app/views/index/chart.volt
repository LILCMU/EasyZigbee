<html>
        <head>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.20.1/vis.min.js"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.20.1/vis.min.css" rel="stylesheet" type="text/css" />
        
            <style type="text/css">
                #mynetwork {
                    width: 600px;
                    height: 400px;
                    border: 1px solid lightgray;
                }
            </style>
        </head>
        <body>
        <div id="mynetwork"></div>
        
        <script type="text/javascript">
            // create an array with nodes
            var nodes = new vis.DataSet([
                {id: 1, label: 'Coordinator',color: 'red'},
                {id: 2, label: 'Node 1'},
                {id: 3, label: 'Node 2'},
                {id: 4, label: 'Node 3'},
                {id: 5, label: 'Node 4'}
            ]);
        
            // create an array with edges
            var edges = new vis.DataSet([
                {from: 1, to: 3 ,dashes:true},
                {from: 1, to: 2 ,dashes:true},
                {from: 1, to: 4 ,dashes:true},
                {from: 1, to: 5 ,dashes:true}
            ]);
        
            // create a network
            var container = document.getElementById('mynetwork');
        
            // provide the data in the vis format
            var data = {
                nodes: nodes,
                edges: edges
            };
            var options = {};
        
            // initialize your network!
            var network = new vis.Network(container, data, options);
        </script>
        </body>
        </html>