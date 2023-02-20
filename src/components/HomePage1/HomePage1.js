import styles from './HomePage1.module.css'
import Header1 from '../Header1/Header1';
import { TfiLayoutGrid3Alt, TfiLayoutGrid3 } from 'react-icons/tfi';
import { RiFileListFill, RiFileListLine } from 'react-icons/ri';


import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import grid from '../../images/grid.svg'
import gridActive from '../../images/gridActive.svg'
import list from '../../images/list.svg'
import listActive from '../../images/listActive.svg'
import getCategoriesApi from '../../api/getCategoriesApi';
import getCompaniesApi from '../../api/getCompaniesApi';
import getColorsApi from '../../api/getColorsApi';
import getProductApi from '../../api/getProductApi';
import searchApi from '../../api/searchApi';
import { debounce, range, values } from 'lodash';
const _ = require('lodash');

function HomePage1() {

    const navigate = useNavigate();

    const [view, setView] = useState({
        isListView:false,
        isGridView:true
    })
    const [categories, setCategories] = useState([{}])
    const [companies, setCompanies] = useState([{}])
    const [colors, setColors] = useState([{}])
    const [products, setProducts] = useState([{}])
    const [priceRange, setPriceRange] = useState('500')
    const [productCount, setProudctCount] = useState('')
    const [filters, setFilters] = useState({
        category:'',
        company:'',
        color:'', 
        price:'', 
        freeshipping:false,
        shortBy:'',
        search:''
    })
    const [productName, setProductName] = useState([{}])


    async function getCategories(){
        const getCategories  = await getCategoriesApi()
        setCategories(getCategories.data)
    }

    async function getCompanies(){
        const getCompanies = await getCompaniesApi()
        setCompanies(getCompanies.data)
    }
    async function getColors(){
        const getColors = await getColorsApi()
        setColors(getColors.data)
    }
    async function getProduct(){
        const getProduct = await getProductApi(filters)
        setProducts(getProduct.data)
        setProudctCount(getProduct.data.length)
    }
    async function searchChange(){
        if(!(filters.search=='')){
            const searchProduct = await searchApi(filters)
            setProducts(searchProduct.data)
            setProudctCount(searchProduct.data.length)
            // setProductName(searchProduct.data)
        }
    }
    
    // const changePriceRange = debounce((e)=>{setFilters({...filters, price:e.target.value})}, 100)

    function selectPrice(price){
        setPriceRange(price)
        setFilters({...filters, price:price})
    }
    function clickImage(product){
        navigate(`${product._id}`);
    }
    function clearButton(){
        if(filters.category || filters.company || filters.color || filters.price || filters.freeshipping){
            setFilters({
                ...filters, 
                category:'', 
                company:'', 
                color:'', 
                price:'', 
                freeshipping:false
            })
        }
        setPriceRange(500)
    }
    function getData(){
        getCategories()
        getCompanies()
        getColors()
        // getProduct()
    }
    function companySelect(event){
        if(event=='all'){
            setFilters({
                ...filters, 
                company:''
            })
        }else{
            setFilters({
                ...filters, 
                company:event
            })
        }
    }
   

    useEffect(()=>{
        getData()
    }, [])
    
    useEffect(()=>{
        if(filters.search==''){
            if(!filters.price==''){
                let timer1 = setTimeout(() => {
                    getProduct()
                }, 500);
                return () =>{clearTimeout(timer1)}
            }
            getProduct()    
        }
        if(!filters.search==''){
            let timer = setTimeout(() => {
                searchChange()
            }, 1000);
            return () =>{clearTimeout(timer)}
        }
       
    }, [filters])



    return ( 
        <div>
            <Header1 />
            <div className={styles.container}>
                <div>
                    <div className={styles.filter_container}>
                        <div className={styles.search}>
                            <input onChange={(e)=>{setFilters({
                                ...filters, 
                                search:e.target.value
                                })}} 
                                type='search' 
                                placeholder='search'
                            />
                        </div>
                        <label className={styles.label}>Category</label><br/>
                        <div className={styles.categories}>
                            {/* <div>All</div> */}
                            <div onClick={()=>{setFilters({...filters, category:''})}}>All</div>
                            <div>
                                {
                                    categories.map((values)=>{
                                        return(
                                            <div onClick={()=>{setFilters({...filters, category:values.category})}}>{values.category}</div>
                                        )
                                    })
                                }
                            </div>
                            {/* <div>cat-2</div>
                            <div>cat-3</div>
                            <div>cat-4</div>
                            <div>cat-5</div>
                            <div>cat-6</div>
                            <div>cat-7</div>
                            <div>cat-8</div>
                            <div>cat-9</div> */}
                        </div>
                        <div className={styles.companies}>
                            <label className={styles.label}>Company</label><br/>
                            <select className={styles.companies_select} onChange={(e)=>{companySelect(e.target.value)}} value={filters.company}>
                                <option>All</option>
                                {
                                    companies.map((values)=>{
                                        return(
                                            <option value={values.companyName}> {values.companyName} </option>
                                        )
                                    })
                                }
                                
                                {/* <option>c-2</option>
                                <option>c-3</option>
                                <option>c-4</option>
                                <option>c-5</option> */}
                            </select>
                        </div>
                        <label className={styles.label}>Colors</label>
                        <div className={styles.colors}>
                            <div onClick={()=>{setFilters({...filters, color:''})}}>All</div>
                            {
                                colors.map((values)=>{
                                    return(
                                        <div onClick={()=>{setFilters({...filters, color:values.color})}} style={{backgroundColor: '#'+values.color}} className={styles.color}></div>
                                    )
                                })
                            }
                            {/* <div className={styles.color}></div>
                            <div className={styles.color}></div>
                            <div className={styles.color}></div>
                            <div className={styles.color}></div> */}
                        </div>
                        <div className={styles.range}>
                            <div className={styles.range_details}>
                                <p className={styles.range_pricetage}>price</p>
                                <p className={styles.range_price}>${priceRange}</p>
                            </div>
                            <input onChange={(e)=>{selectPrice(e.target.value)}} value={priceRange} min="1" max="500" step="1" type='range'/>
                        </div>
                        <div className={styles.shipping}>
                            <label className={styles.label}>freeshipping</label>
                            <input checked={filters.freeshipping} value={filters.freeshipping} onClick={()=>{setFilters({...filters, freeshipping:!filters.freeshipping})}}  type='checkbox'/>
                        </div>
                        <div className={styles.button_container}>
                            <button onClick={clearButton} className={styles.button}>Clear Filters</button>
                        </div>
                    </div>
                </div>

                <div className={styles.product_container}>
                    <div className={styles.topbar_container}>
                        <div className={styles.grid_icon}>
                            <div onClick={()=>{setView({...view, isGridView:true, isListView:false})}}>
                            {view.isGridView?<TfiLayoutGrid3Alt fontSize="1.5em"/>:<TfiLayoutGrid3 fontSize="1.5em"/>}
                            </div>
                            <div onClick={()=>{setView({...view, isListView:true, isGridView:false})}}>
                            {view.isListView?<RiFileListFill fontSize="1.8em"/>:<RiFileListLine fontSize="1.8em"/>}
                            </div>
                        </div>
                        <div className={styles.line}></div>
                        <div>
                            <select onChange={(e)=>{setFilters({...filters, shortBy:e.target.value})}} className={styles.short_select}>
                                <option>Price(lowest)</option>
                                <option>Price(Highest)</option>
                                <option>Name(A-Z)</option>
                                <option>Name(Z-A)</option>
                            </select>
                        </div>
                    </div>
                    
                   
                    <div className={styles.grid_container}>
                        {
                            products.map((product)=>{
                                return(
                                    view.isGridView && !productCount==0?
                                    (
                                    <div className={styles.grid}>
                                        <img className={styles.grid_image} src={product.image} height="180" width="350"/>
                                        <div className={styles.gird_details}>
                                            <p className={styles.grid_name}>{product.name}</p>
                                            <p className={styles.grid_price}>${product.price}</p>
                                        </div>
                                    </div>
                                    )
                                    :
                                    (
                                        ''
                                    )
                                )
                            })
                        }
                        {/* <div className={styles.grid}>
                            <img className={styles.grid_image} src="https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg"/>
                            <div className={styles.gird_details}>
                                <p className={styles.grid_name}>name</p>
                                <p className={styles.grid_price}>$300</p>
                            </div>
                        </div>
                        <div className={styles.grid}>
                            <img className={styles.grid_image} src="https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg"/>
                        </div>
                        <div className={styles.grid}>
                            <img className={styles.grid_image} src="https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg"/>
                        </div> */}
                    </div>

                    {
                        products.map((product)=>{
                            return(
                                view.isListView && !productCount==0?
                                (
                                <div className={styles.list_container}>
                                    <img className={styles.list_image}src={product.image}/>
                                    <div className={styles.list_info}>
                                        <p className={styles.list_name}>{product.name}</p>
                                        <p className={styles.list_price}>${product.price}</p>
                                        <p className={styles.list_detail}>{product.discription}</p>
                                        <button className={styles.list_button} onClick={()=>{clickImage(product)}}>Details</button> 
                                    </div>
                                </div>
                                    )
                                    :
                                    (
                                        ''
                                    )
                                )
                            })
                        }

                    {/* <div className={styles.list_container}>
                        <img className={styles.list_image}src="https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg"/>
                        <div className={styles.list_info}>
                            <p className={styles.list_name}>name</p>
                            <p className={styles.list_price}>$300</p>
                            <p className={styles.list_detail}>using using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                            <button className={styles.list_button}>Details</button> 
                        </div>
                    </div>
                    <div className={styles.list_container}>
                        <img className={styles.list_image}src="https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg"/>
                        <div className={styles.list_info}>
                            <p className={styles.list_name}>name</p>
                            <p className={styles.list_price}>$300</p>
                            <p className={styles.list_detail}>using using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                            <button className={styles.list_button}>Details</button> 
                        </div>
                    </div>
                    <div className={styles.list_container}>
                        <img className={styles.list_image}src="https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg"/>
                        <div className={styles.list_info}>
                            <p className={styles.list_name}>name</p>
                            <p className={styles.list_price}>$300</p>
                            <p className={styles.list_detail}>using using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                            <button className={styles.list_button}>Details</button> 
                        </div>
                    </div>
                    <div className={styles.list_container}>
                        <img className={styles.list_image}src="https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg"/>
                        <div className={styles.list_info}>
                            <p className={styles.list_name}>name</p>
                            <p className={styles.list_price}>$300</p>
                            <p className={styles.list_detail}>using using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                            <button className={styles.list_button}>Details</button> 
                        </div>
                    </div>
                    <div className={styles.list_container}>
                        <img className={styles.list_image}src="https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg"/>
                        <div className={styles.list_info}>
                            <p className={styles.list_name}>name</p>
                            <p className={styles.list_price}>$300</p>
                            <p className={styles.list_detail}>using using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                            <button className={styles.list_button}>Details</button> 
                        </div>
                    </div>
                    <div className={styles.list_container}>
                        <img className={styles.list_image}src="https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg"/>
                        <div className={styles.list_info}>
                            <p className={styles.list_name}>name</p>
                            <p className={styles.list_price}>$300</p>
                            <p className={styles.list_detail}>using using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                            <button className={styles.list_button}>Details</button> 
                        </div>
                    </div>
                    <div className={styles.list_container}>
                        <img className={styles.list_image}src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"/>
                        <div className={styles.list_info}>
                            <p className={styles.list_name}>name</p>
                            <p className={styles.list_price}>$300</p>
                            <p className={styles.list_detail}>using using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                            <button className={styles.list_button}>Details</button> 
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
     ); 
}

export default HomePage1;