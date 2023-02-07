import styles from './HomePage.module.css';
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import grid from '../../images/grid.svg'
import gridActive from '../../images/gridActive.svg'
import list from '../../images/list.svg'
import listActive from '../../images/listActive.svg'

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Mango 🥭", value: "mango1" },
  { label: "Mango 🥭", value: "mango23" },
  { label: "Mango 🥭", value: "mango3" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

function HomePage() {
    const [selected, setSelected] = useState([]);
    const [view, setView] = useState({
        isListView:false,
        isGridView:true
    })

    return ( 
        <div>
            <div className={styles.container}>
                    <div className={styles.heading}><p>Home/</p></div>
                <div className={styles.wrapper}>
                    <div className={styles.containerLeft}>
                        <div className='row'>
                            <div><input type='search' placeholder='search'/></div>
                        </div>
                        <div className={styles.category}>
                            <div className='row mt-3'>
                                <label className={styles.label}>Category</label>
                                <div className={styles.categoryList}>
                                    <div className={styles.all}>All</div>
                                    <div>cat 1</div>
                                    <div>cat 2</div>
                                    <div>cat 3</div>
                                    <div>cat 4</div>
                                    <div>cat 4</div>
                                    <div>cat 4</div>
                                    <div>cat 4</div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div style={styles.selecteCompany}>
                                {/* <pre>{JSON.stringify(selected)}</pre> */}
                                {/* <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                /> */}

                                <label className={styles.label}>Company</label><br/>
                                <select className={styles.selectCompany}>
                                    <option>all</option>
                                    <option>lenovo</option>
                                    <option>hp</option>
                                    <option>samsumg</option>
                                </select>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <label className={styles.label}>Colors</label>
                            <div className={styles.colorSelect}>
                                <div className={styles.colorArea}>
                                    <div className='me-2'><div className={styles.all}>all</div></div>
                                    <div className={styles.colors}></div>
                                    <div className={styles.colors}></div>
                                    <div className={styles.colors}></div>
                                    <div className={styles.colors}></div>
                                    <div className={styles.colors}></div>
                                    <div className={styles.colors}></div>
                                    <div className={styles.colors}></div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <label className={styles.label}>Price</label>
                            <label>100</label>
                            <div><input type='range'/></div>
                        </div>
                        <div className='row mt-3'>
                            <div className='d-flex '>
                                <label className={styles.label}>free shipping</label>
                                <div className='pt-1'><input type='checkbox'/></div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <button className={styles.clearButton} >Clear Filters</button>
                        </div>
                    </div>
                    
                    <div className={styles.containerRight}>
                        <div >
                            <div className='row pb-2'>
                                <div className='d-flex'>
                                    <div onClick={()=>{setView({...view, isGridView:true, isListView:false})}}><img src={view.isGridView? gridActive:grid } /></div>
                                    <div className='ms-2' onClick={()=>{setView({...view, isListView:true, isGridView:false})}}><img src={view.isListView? listActive:list } /></div>
                                    <div className={styles.productsCount}>22 product found</div>
                                    <div className={styles.Hrline}></div>
                                    <div className={styles.short}>
                                        <div className='d-flex'>
                                            <p>Short By</p>
                                            <div>
                                                <select className={styles.shortSelect}>
                                                    <option>Price(lowest)</option>
                                                    <option>Price(Highest)</option>
                                                    <option>Name(A-Z)</option>
                                                    <option>Name(Z-A)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardContainer}>
                        <div className='row'>
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                            {
                                view.isGridView?
                                <div className='col-4 mt-4'>
                                    <div className={styles.card}></div>
                                    <div className='d-flex justify-content-between'>
                                        <p className={styles.gridName}>Modern Poster</p>
                                        <p className={styles.gridPrice}>$30.99</p>
                                    </div>
                                </div>
                                :
                                <div className='row'>
                                <div className='col-4 mt-4'><div className={styles.card}></div></div>
                                <div className='col-8'>
                                    <div className={styles.cardDetails}>
                                        <p className={styles.cardName}>Modern Poster</p>
                                        <p className={styles.cardPrice}>$ 30.99</p>
                                        <p className={styles.cardDiscription} >using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>
                                        <button className={styles.detailsButton}>DETAILS</button>
                                    </div> 
                                </div>
                                </div>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            <footer className={styles.footer}>C 2023<label> Dremy store</label>All rights reserved</footer>
            </div>
        </div>
     );
}

export default HomePage;