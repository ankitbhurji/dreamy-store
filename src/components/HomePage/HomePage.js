import styles from './HomePage.module.css'
import Header from '../Header/Header';
import { TfiLayoutGrid3Alt, TfiLayoutGrid3 } from 'react-icons/tfi';
import { RiFileListFill, RiFileListLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import getCategoriesApi from '../../api/getCategoriesApi';
import getCompaniesApi from '../../api/getCompaniesApi';
import getColorsApi from '../../api/getColorsApi';
import getProductApi from '../../api/getProductApi';
import searchApi from '../../api/searchApi';
import { debounce, range, values } from 'lodash';
const _ = require('lodash');



function HomePage() {

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
            <Header />
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
                            <div onClick={()=>{setFilters({...filters, category:''})}}>All</div>
                            <div>
                                {
                                    categories.map((values)=>{
                                        return(
                                            <div className={values.category==filters.category? 
                                                (styles.categories_active)
                                                :
                                                ('')}  
                                                onClick={()=>{setFilters({
                                                    ...filters, 
                                                    category:values.category
                                                })}}
                                                >{values.category}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className={styles.companies}>
                            <label className={styles.label}>Company</label><br/>
                            <select className={styles.companies_select} 
                                    onChange={(e)=>{companySelect(e.target.value)}} 
                                    value={filters.company}
                            >
                                <option>All</option>
                                {
                                    companies.map((values)=>{
                                        return(
                                            <option value={values.companyName}> {values.companyName} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <label className={styles.label}>Colors</label>
                        <div className={styles.colors}>
                            <div onClick={()=>{setFilters({...filters, color:''})}}>All</div>
                            {
                                colors.map((values)=>{
                                    return(
                                        <div onClick={()=>{setFilters({
                                                ...filters, 
                                                color:values.color
                                            })}} 
                                            style={{backgroundColor: '#'+values.color}} 
                                            className={values.color==filters.color? 
                                            (`${styles.color_active} ${styles.color}`)
                                            :
                                            (styles.color)}>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className={styles.range}>
                            <div className={styles.range_details}>
                                <label className={styles.label}>Price</label>
                                <div className={styles.range_price}>${priceRange}</div>
                            </div>
                            <input 
                                onChange={(e)=>{selectPrice(e.target.value)}} 
                                value={priceRange} 
                                min="1" 
                                max="500" 
                                step="1" 
                                type='range'
                            />
                        </div>

                        <div className={styles.shipping}>
                            <label className={styles.label}>freeshipping</label>
                            <input 
                                checked={filters.freeshipping} 
                                value={filters.freeshipping} 
                                onClick={()=>{setFilters({
                                    ...filters, 
                                    freeshipping:!filters.freeshipping
                                    })}}  
                                    type='checkbox'
                            />
                        </div>

                        <div className={styles.button_container}>
                            <button onClick={clearButton} className={styles.button}>Clear Filters</button>
                        </div>
                    </div>
                </div>

                <div className={styles.product_container}>
                    <div className={styles.topbar_container}>
                        <div className={styles.grid_icon}>
                            <div onClick={()=>{setView({
                                ...view, 
                                isGridView:true, 
                                isListView:false
                                })}}
                                >
                                {
                                view.isGridView?<TfiLayoutGrid3Alt fontSize="1.5em"/>
                                :
                                <TfiLayoutGrid3 fontSize="1.5em"/>
                                }
                            </div>
                            
                            <div onClick={()=>{setView({
                                ...view, isListView:true, 
                                isGridView:false
                                })}}
                                >
                                {
                                view.isListView?<RiFileListFill fontSize="1.8em"/>
                                :
                                <RiFileListLine fontSize="1.8em"/>
                                }
                            </div>
                        </div>
                        <div className={styles.product_count}>{productCount} product found</div>
                        <div className={styles.line}></div>
                        <div className={styles.short}>
                            <select onChange={(e)=>{setFilters({
                                ...filters, 
                                shortBy:e.target.value
                                })}} 
                                className={styles.short_select}
                                >
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
                                        <div onClick={()=>{clickImage(product)}} className={styles.grid}>
                                            <img className={styles.grid_image} src={product.image} />
                                            <div className={styles.gird_details}>
                                                <p className={styles.grid_name}>{product.name}</p>
                                                <p className={styles.grid_price}>${product.price}</p>
                                            </div>
                                        </div>
                                    )
                                    :
                                    view.isListView && !productCount==0?
                                    (
                                        <>
                                        <div className={styles.list}>
                                        <img className={styles.list_image}src={product.image}/>
                                        </div>
                                        <div className={styles.list_info}>
                                        <div className={styles.list_name}>{product.name}</div>
                                            <div className={styles.list_price}>${product.price}</div>
                                            <div className={styles.list_detail}>{product.discription}</div>
                                            <button onClick={()=>{clickImage(product)}} className={styles.list_button}>Details</button> 
                                        </div>
                                        </>
                                    )
                                    :
                                    ('')
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
     ); 
}

export default HomePage;