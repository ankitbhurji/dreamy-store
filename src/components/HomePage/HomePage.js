import styles from './HomePage.module.css';
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
import { debounce, range } from 'lodash';
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
            <Header/>
            <div className='row'>
                <div className='col-3'>
                    <div className={styles.leftContainer}>
                        <div className={styles.search}>
                            <input onChange={(e)=>{setFilters({
                                ...filters, 
                                search:e.target.value
                                })}} 
                                type='search' 
                                placeholder='search'
                            />
                        </div>
                        <div className={styles.category}>
                            <label>Category</label>
                            <div onClick={()=>{setFilters({
                                ...filters, 
                                category:''
                                })}} 
                                className={styles.all}>all
                            </div>
                            <div>
                                {
                                    categories.map((values)=>{
                                     return(
                                        <div className={values.category==filters.category? 
                                            (`${styles.categoryList} ${styles.categoryListActive}`)
                                            :
                                            (`${styles.categoryList}`)} 
                                            onClick={()=>{setFilters({
                                                ...filters, 
                                                category:values.category
                                            })}}
                                        >
                                            {values.category}
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.company}>
                            <label>Company</label><br/>
                            <select className={styles.selectCompany} 
                                value={filters.company} 
                                onChange={(e)=>{companySelect(e.target.value)}}
                            >
                            <option className={styles.companyList}>all</option>
                                { 
                                    companies.map((values)=>{
                                        return(
                                            <option className={`${styles.companyList} ${styles.companyListActive}`} 
                                            value={values.companyName}
                                            >
                                            {values.companyName}
                                            </option>
                                            )
                                        })
                                    } 
                            </select>
                        </div>
                        <div >
                            <label className={styles.colorLabel}>Color</label><br/>
                            <div className={styles.color}>
                                <div className='me-2'>
                                    <div onClick={()=>{setFilters({
                                        ...filters, 
                                        color:''
                                        })}} 
                                        className={styles.all}
                                        >all
                                    </div>
                                </div>
                                {
                                    colors.map((values)=>{
                                        return(
                                            <div onClick={()=>{setFilters({
                                                ...filters, 
                                                color:values.color
                                                })}} 
                                                className={ values.color==filters.color? 
                                                (`${styles.colors}${styles.colorActive}`)
                                                :
                                                (`${styles.colors} `)}
                                                value={values.color} 
                                                style={{backgroundColor: '#'+values.color}}>
                                             </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.price}>
                            <label className={styles.priceLabel}>Price</label>
                            <label className={styles.priceRange}>${priceRange}</label><br/>
                            <input onChange={(e)=>{selectPrice(e.target.value)}} 
                            value={priceRange} 
                            className={styles.range} 
                            type='range' 
                            min="1" 
                            max="500"  
                            step="2"
                        />  
                        </div>
                        <div className={styles.freeshipping}>
                            <label>freeshipping</label>
                            <div className='pt-1'>
                                <input checked={filters.freeshipping} 
                                    value={filters.freeshipping} 
                                    onClick={()=>{setFilters({
                                    ...filters, 
                                    freeshipping:!filters.freeshipping
                                    })}} 
                                    type='checkbox'
                                />
                            </div>
                        </div>
                        <div className='mt-3'>
                            <button onClick={clearButton} className={styles.clearButton} >Clear Filters</button>
                        </div>
                    </div>
                </div>

                <div className='col-9'>
                    <div className={styles.rightContainer}>
                        <div className={styles.demo}>
                            <div className={styles.demo1}>
                                <div onClick={()=>{setView({
                                    ...view, 
                                    isGridView:true, 
                                    isListView:false
                                    })}} 
                                    className={
                                        view.isListView?
                                        (`${styles.gridIcon} ${styles.gridIconActive}`)
                                        :
                                        (`${styles.gridIcon}`)
                                         }>
                                        <img src={view.isGridView? gridActive:grid } />
                                </div>
                                <div  onClick={()=>{setView({
                                    ...view, 
                                    isListView:true, 
                                    isGridView:false
                                    })}} 
                                    className={view.isListView?
                                    (`${styles.listIcon} ${styles.listIconActive}`)
                                    :
                                    (`${styles.listIcon}`)
                                    }>
                                    <img src={view.isListView? listActive:list } />
                                </div>
                                <div className={styles.productsCount}>{productCount} product found</div>
                            </div>
                            <hr/>
                            <div className={styles.demo2}>
                            <p>Short By</p>
                                <div>
                                    <select onChange={(e)=>{setFilters({
                                        ...filters, 
                                        shortBy:e.target.value
                                        })}} 
                                        className={styles.shortSelect}
                                        >
                                        <option>Price(lowest)</option>
                                        <option>Price(Highest)</option>
                                        <option>Name(A-Z)</option>
                                        <option>Name(Z-A)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {
                            !productCount?(
                            <div className='row'>
                                <div >
                                    <div className={styles.pageNotFound}>
                                        <h1 className={styles.test}>product not found!</h1>
                                    </div>
                                </div>
                            </div>
                            ):
                            ('')
                        }
                        <div className={styles.cardContainer}>
                            {
                                products.map((product)=>{
                                    return(
                                        view.isGridView && !productCount==0?
                                        (
                                        <div className={styles.gridCard} onClick={()=>{clickImage(product)}}>
                                            <img src={product.image} height="160" width="242"/>
                                            <div className={styles.gridInfo}>
                                                <p className={styles.gridName}>{product.name}</p>
                                                <p className={styles.gridPrice}>${product.price}</p>
                                            </div>
                                        </div>
                                        )
                                        :
                                        view.isListView && !productCount==0?
                                        (<div className={styles.listCard}>
                                            <img  src={product.image} height="160" width="282"/>
                                            <div className={styles.listInfo}>
                                                <p className={styles.listName}>{product.name}</p>
                                                <p className={styles.listPrice}>${product.price}</p>
                                                <p className={styles.listDiscription}>{product.discription}</p>
                                                <button className={styles.detailsButton} onClick={()=>{clickImage(product)}}>DETAILS</button>
                                            </div>
                                        </div>)
                                        :
                                        ('')
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default HomePage;