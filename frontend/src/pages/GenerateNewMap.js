import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@mui/material';
import { Stage, Layer } from 'react-konva';
import { generateTarget, drawNodes, updateObjects, makeConnection } from '../util/map_graph_util';

const GenerateNewMap = () => {
    const [targets, setTargets] = useState([])
    const [connectors, setConnectors] = useState([])
    const layerRef = React.useRef();
    const [nodes, setNodes] = useState([])    //list with max size 2
    const setSelectedNode = (newNode) => {
        console.log("Node clicked, before update: ", nodes)
        console.log("Node length, before update: ", nodes.length)
         console.log("Setting node", newNode.attrs.id)
        //  console.log("Prev Node", node)
        if (nodes.length === 0) {    //no nodes was selected before
            console.log("Adding node 1")
            //layerRef.current.findOne('#' + newNode.attrs.id).shadowColor('red')
            setNodes([newNode]);
            return;
        }
        else if (nodes.length === 1) {   //node was selected before 
            if (newNode.attrs.id == nodes[0].attrs.id) {  //same node is selected now
                console.log("Same node selected")
                setNodes([])
                removeCircleHighlight();
                return;
            }
            else {
                // nodes[1] = newNode
                console.log("Adding node 2")
                removeCircleHighlight();
                setNodes(prevState => [...prevState, newNode]);
                return;
            }
        }
        else if (nodes.length === 2) {   // new selection alltogether
            console.log("clearing and adding Node 1")
            removeCircleHighlight();
            //layerRef.current.findOne('#' + newNode.attrs.id).shadowColor('red')
            setNodes([newNode])
            return;
        }

    }

    const handleNewNodeClick = () => {
        removeCircleHighlight();
        setNodes([])
        //console.log(layerRef.current)
        const stage = layerRef.current.parent;
        const tars = generateTarget(targets, stage)
        setTargets(tars)
        console.log("Targetsss: ", tars)

        drawNodes(connectors, [tars[tars.length - 1]], layerRef.current, setSelectedNode)

    }

    const removeCircleHighlight = () => {
        for (var i = 0; i < targets.length; i++) {
            layerRef.current.findOne('#' + targets[i].id).shadowColor('black')
        }
    }

    const addCircleHighlight = () => {
        for (var i = 0; i < nodes.length; i++) {
           // console.log("Highlighted: ", nodes[i].attrs.id)
            layerRef.current.findOne('#' + nodes[i].attrs.id).shadowColor('red')
        }
    }
    const removeExtraCircleHighlights = () => {
        for (var i = 0; i < targets.length; i++) {
            if (nodes.find(node => node.attrs.id === targets[i].id) === undefined)  //node is not selected
                layerRef.current.findOne('#' + targets[i].id).shadowColor('black')
        }
    }


    useEffect(() => {
        console.log("NODES SET: ", nodes)
        addCircleHighlight();
        removeExtraCircleHighlights();
        // console.log("SELECT STATUS: ", isNodeSelected)
        if (nodes.length === 2) {
            console.log("Adding connection")
            removeCircleHighlight();
            var newCons = makeConnection(targets, connectors, nodes[0].attrs.id, nodes[1].attrs.id)
            drawNodes([newCons[newCons.length - 1]], [], layerRef.current, setSelectedNode)
            setConnectors(newCons)
            updateObjects(targets, connectors, layerRef.current)
        }

        /*   layerRef.current.findOne('#' + node.attrs.id).attrs.shadowColor = 'red';*/
    }, [nodes]);



    return (
        <Grid container sx={{ mt: 1 }} direction="column">
            <Button variant="contained" sx={{ mb: 1 }} onClick={handleNewNodeClick}>Add Node</Button>
            <Stage
                style={{
                    border: '2px solid',
                    marginTop: '2px',
                }}
                width={window.innerWidth - 50}
                height={window.innerHeight - 50}
                onDragMove={() => { updateObjects(targets, connectors, layerRef.current) }}

            >
                <Layer ref={layerRef}>

                </Layer>
            </Stage>
        </Grid>
    )
}

export default GenerateNewMap;