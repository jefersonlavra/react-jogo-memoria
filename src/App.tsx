import { useEffect, useState } from 'react';
import * as C from './App.styles';
import logoImg from './assets/devmemory_logo.png';
import restartIcon from './svgs/restart.svg';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItem } from './components/GridItem';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';


const App = () => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [moveCount, setMoveCount] = useState<number>(0);
    const [shownCount, setShounCount] = useState<number>(0);
    const [gridItems, setGridItems] = useState<GridItemType[]>([]);

    useEffect(() => resetAndCreateGrid(), []);

    useEffect(() => {
        const timer = setInterval(()=> {
            if(playing) {
                setTimeElapsed(timeElapsed + 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [playing, timeElapsed]);


    useEffect(() => {
        if(shownCount === 2){
            let opened = gridItems.filter(item => item.shown);

            if(opened.length === 2) {

                if(opened[0].item === opened[1].item) {
                   
                    let tmpGrid = [...gridItems];

                    for(let i in tmpGrid) {
                        if(tmpGrid[i].shown) {
                            tmpGrid[i].permanentShown = true;
                            tmpGrid[i].shown = false;
                        }
                    }

                    setGridItems(tmpGrid);
                    setShounCount(0);
                }
                else {
                    setTimeout(() => {
                        let tmpGrid = [...gridItems];

                        for(let i in tmpGrid) {
                            tmpGrid[i].shown = false;
                        }
                        
                        setGridItems(tmpGrid);
                        setShounCount(0);
                    }, 1000);
                }

                setMoveCount(moveCount => moveCount + 1);
            }
        }
    }, [shownCount, gridItems]);

    useEffect(() => {
        if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
            setPlaying(false);
        }
    }, [moveCount, gridItems]);

    const resetAndCreateGrid = () => {
        // RESETANDO O JOGO
        setTimeElapsed(0);
        setMoveCount(0);
        setShounCount(0);

        // CRIANDO O GRID
        let tmpGrid: GridItemType[] = [];
        for(let i = 0; i < (items.length*2); i++) {
            tmpGrid.push({
                item: null,
                shown: false,
                permanentShown: false
            });
        }

        for(let w = 0; w < 2; w++) {
            for(let i = 0; i < items.length; i++) {
                let pos = -1;
                while(pos < 0 || tmpGrid[pos].item !== null) {
                    pos = Math.floor(Math.random() * (items.length * 2));
                }
                tmpGrid[pos].item = i;
            }
        }
        setGridItems(tmpGrid);

        // COMEÇAR O JOGO
        setPlaying(true);

    }

    const handleItemClick = (index: number) => {
        if(playing && index !== null && shownCount < 2) {
            let tmpGrid = [...gridItems];

            if(!tmpGrid[index].permanentShown && !tmpGrid[index].shown) {
                tmpGrid[index].shown = true;
                setShounCount(shownCount + 1);
                
            }

            setGridItems(tmpGrid);
        }
    }

    
    return (

        <C.Container>
            
            <C.Info>
                <C.LogoLink href="">
                    <img src={logoImg} width="200" alt="" />
                </C.LogoLink>

                <C.InfoArea>
                    <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
                    <InfoItem label="Movimentos" value={moveCount.toString()} />
                </C.InfoArea>

                <Button label="Reiniciar" icon={restartIcon} onClick={resetAndCreateGrid} />

            </C.Info>
            
            <C.GridArea>
                <C.Grid>
                    {gridItems.map((item, index) => (
                        <GridItem 
                            key={index}
                            item={item}
                            onClick={()=> handleItemClick(index)}
                        />
                    ))}
                </C.Grid>
            </C.GridArea>

        </C.Container>
    );
}

export default App;
