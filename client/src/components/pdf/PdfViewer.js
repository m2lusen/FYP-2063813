// import { stat } from 'fs/promises';
import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';



const PdfViewer = () => {
    const [pdfUrl, setPdfUrl] = useState('');

    const location = useLocation();
    const { armyList, gameSystem, armies } = location.state;

    const [body, setBody] = useState({});

    useEffect(() => {
        console.log(armyList)
        console.log(gameSystem)
        console.log(armies)
        if (armyList && gameSystem && armies){
            const forces = armyList[5].map(forceSubArray => {
                const units = forceSubArray[6].map(unitSubArray => {
                    const superTypeId = unitSubArray[6];
                    const supertype = gameSystem[6].find(type => type[0] === superTypeId);
                    const supertypeName = supertype ? supertype[1] : '';

                    // statlines
                    const statlines = unitSubArray[8].map(statlineSubArray => { // return to tommorow
    
                        const statGameInfo = gameSystem[5];
                        const army = (armies.find(item => item[0] == forceSubArray[1]));
                        // console.log(army[4].find(item => item[10] == unitSubArray[10]))
                        // const stats = statlineSubArray[]

                        return {
                            statlineName: statlineSubArray[5],
                            statlinePointCost: statlineSubArray[4]
                            // unitColor: unitSubArray[2]
                        };
                    });

                    // upgrades
                    
                    return {
                        unitName: unitSubArray[1],
                        unitColor: unitSubArray[2],
                        unitTitle: unitSubArray[3],
                        unitPointCost: unitSubArray[4],
                        unitTotalPointCost: unitSubArray[7],
                        superTypeId: superTypeId,
                        supertypeName: supertypeName
                    };
                })
                .sort((a, b) => a.superTypeId - b.superTypeId);
                // rules

                return {
                    ForceName: forceSubArray[2],
                    ForceEdition: forceSubArray[3],
                    ForceVersion: forceSubArray[4],
                    ForceTotalPoints: forceSubArray[5],
                    ForceUnits: units // change add supertype
                };
            });

            setBody(prevState => ({
                ...prevState,
                ListName: armyList[3],
                TotalPoints: armyList[4],
                forces: forces
            }));

            console.log(body)
        }
    }, [armyList, gameSystem, armies]);


    const fetchPdf = async () => {
        const response = await fetch('http://localhost:4000/pdf', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
        const blob = await response.blob();
        // console.log(blob)
        const url = URL.createObjectURL(blob);
        // console.log(url);
        setPdfUrl(url);
    };

    return (
        <div>
            <button onClick={fetchPdf}>Generate PDF</button>
            {pdfUrl && <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="600px" />}
        </div>
    );
};

export default PdfViewer;
