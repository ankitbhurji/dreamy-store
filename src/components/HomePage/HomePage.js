import styles from './HomePage.module.css';
import React, { useEffect, useReducer, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import grid from '../../images/grid.svg'
import gridActive from '../../images/gridActive.svg'
import list from '../../images/list.svg'
import listActive from '../../images/listActive.svg'
import axios from 'axios'
import getCategoriesApi from '../../api/getCategoriesApi';
import getCompaniesApi from '../../api/getCompaniesApi';
import getColorsApi from '../../api/getColorsApi';
import getProductApi from '../../api/getProductApi';
import searchApi from '../../api/searchApi';
import { debounce, range } from 'lodash';
const _ = require('lodash');

function HomePage(props) {
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
    async function getProduct(clr){
        const getProduct = await getProductApi(filters)
        setProducts(getProduct.data)
        setProudctCount(getProduct.data.length)
    }
    async function searchChange(){
        // setFilters({...filters, search:event})
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
    console.log(filters.price)

    function clickImage(product){
        props.WindowKey({isProductKey:true, isHomePageKey:false})   
        props.products(product)
    }
    function clearButton(){
        if(filters.category || filters.company || filters.color || filters.price || filters.freeshipping){
            setFilters({...filters, category:'', company:'', color:'', price:'', freeshipping:false})
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
            setFilters({...filters, company:''})
        }else{
            setFilters({...filters, company:event})
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
            <div className={styles.wrapper}>
                    <div className={styles.containerLeft}>
                        <div className='row'>
                            {/* <div><input onChange={(e)=>{searchChange(e.target.value)}} type='search' placeholder='search'/></div> */}
                            <div><input onChange={(e)=>{setFilters({...filters, search:e.target.value})}} type='search' placeholder='search'/></div>
                            {/* <ul className={styles.list}>
                                {productName.map((values)=>{
                                    return(
                                        <li onClick={clickSearchList} className={styles.list1}>{values.name}</li>
                                    )
                                })}
                            </ul> */}
                        </div>
                        <div className={styles.category}>
                            <div className='row mt-3'>
                                <label className={styles.label}>Category</label>
                                <div className={styles.allCategory}>
                                    <div onClick={()=>{setFilters({...filters, category:''})}} className={styles.all}>all</div>
                                    <div>
                                        {
                                           categories.map((values)=>{
                                            return(
                                                <div className={values.category==filters.category? (`${styles.categoryList} ${styles.categoryListActive}`):(`${styles.categoryList}`)} onClick={()=>{setFilters({...filters, category:values.category})}}>{values.category}</div>
                                            )
                                           })
                                        }
                                    </div>
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
                                {/* <select className={`${styles.selectCompany} ${styles.companyList}`} onChange={(e)=>{setFilters({...filters, company:e.target.value})}}> */}
                                <select className={styles.selectCompany} value={filters.company} onChange={(e)=>{companySelect(e.target.value)}}>
                                <option className={styles.companyList}>all</option>
                                    { 
                                        companies.map((values)=>{
                                            return(
                                                <option className={`${styles.companyList} ${styles.companyListActive}`} value={values.companyName}>{values.companyName}</option>
                                            )
                                        })
                                    } 
                                </select>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <label className={styles.label}>Colors</label>
                            <div className={styles.colorSelect}>
                                <div className={styles.colorArea}>
                                    <div className='me-2'><div onClick={()=>{setFilters({...filters, color:''})}} className={styles.all}>all</div></div>
                                    {/* <div className={styles.colors} style={{backgroundColor: 'blue'}}></div> */}
                                    {
                                        colors.map((values)=>{
                                            return(
                                                <div onClick={()=>{setFilters({...filters, color:values.color})}} className={ values.color==filters.color? (`${styles.colors} ${styles.colorActive}`):(`${styles.colors} `)} value={values.color} style={{backgroundColor: '#'+values.color}}></div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <label className={styles.label}>Price</label>
                            <label className={styles.companyList}>${priceRange}</label>
                            {/* <div><input onChange={(e)=>{setPriceRange(e.target.value)}} onClick={changePriceRange}  value={priceRange} className={styles.range} type='range' min="1" max="500"  step="2"/></div> */}
                            <div><input onChange={(e)=>{selectPrice(e.target.value)}}  value={priceRange} className={styles.range} type='range' min="1" max="500"  step="2"/></div>
                        </div>
                        <div className='row mt-3'>
                            <div className='d-flex '>
                                <label className={styles.label}>free shipping</label>
                                <div className='pt-1'><input checked={filters.freeshipping} value={filters.freeshipping} onClick={()=>{setFilters({...filters, freeshipping:!filters.freeshipping})}} type='checkbox'/></div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <button onClick={clearButton} className={styles.clearButton} >Clear Filters</button>
                        </div>
                    </div>
                    
                    <div className={styles.containerRight}>
                        <div >
                            <div className='row pb-2'>
                                <div className='d-flex'>
                                    <div onClick={()=>{setView({...view, isGridView:true, isListView:false})}} className={view.isGridView?(`${styles.gridIcon} ${styles.gridIconActive}`):(`${styles.gridIcon}`) }><img src={view.isGridView? gridActive:grid } /></div>
                                    <div  onClick={()=>{setView({...view, isListView:true, isGridView:false})}} className={view.isListView?(`${styles.listIcon} ${styles.listIconActive}`):(`${styles.listIcon}`)}><img src={view.isListView? listActive:list } /></div>
                                    <div className={styles.productsCount}>{productCount} product found</div>
                                    <div className={styles.Hrline}></div>
                                    <div className={styles.short}>
                                        <div className='d-flex'>
                                            <p>Short By</p>
                                            <div>
                                                <select onChange={(e)=>{setFilters({...filters, shortBy:e.target.value})}} className={styles.shortSelect}>
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
                            <div className='row'>
                                {
                                    products.map((product)=>{
                                    return(
                                        view.isGridView && !productCount==0?
                                        <div className='col-4 mt-4'>
                                            <div className={styles.card}  onClick={()=>{clickImage(product)}}><img src={product.image} height="160" width="292"/></div>
                                            <div className='d-flex justify-content-between'>
                                                <p className={styles.gridName}>{product.name}</p>
                                                <p className={styles.gridPrice}>${product.price}</p>
                                            </div>
                                        </div>
                                        :
                                        view.isListView && !productCount==0?
                                        <div className='row'>
                                        <div className='col-4 mt-4' onClick={()=>{clickImage(product)}}>
                                        <div className={styles.card}><img src={product.image} height="160" width="292"/></div></div>
                                        <div className='col-8'>
                                            <div className={styles.cardDetails}>
                                                <p className={styles.cardName}>{product.name}</p>
                                                <p className={styles.cardPrice}>${product.price}</p>
                                                <p className={styles.cardDiscription} >{product.discription}</p>
                                                <button className={styles.detailsButton} onClick={()=>{clickImage(product)}}>DETAILS</button>
                                            </div> 
                                        </div>
                                        </div>
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