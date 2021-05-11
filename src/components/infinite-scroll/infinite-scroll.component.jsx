import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import './infinite-scroll.style.scss';

import ItemCardComponent from '../../components/item-card/item-card.component';

const InfiniteComponent = ({items, day, hour, minute, amOPm}) => {
    const [offset, setOffset] = useState(0);

    const observer = useRef();
    const lastElement = useCallback(node => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setOffset(items.length);
            }
        })

        if (node) {
            observer.current.observe(node);
        }
    }, [items])

    useEffect(() => {
        console.log('masuk sini');
        let time = moment(`${hour}:${minute} ${amOPm}`, 'hh:mm A').format('HH:mm:ss');
        axios({
            method: 'get',
            url: `http://localhost:8080/api/restaurant/${day}.${time}.${offset}`
        }).then(res => {
            let ids = new Set(items.map(d => d.id));
            items =  [...items, ...res.data.filter(d => !ids.has(d.id))];
        }).catch(err => {
            console.log(err);
        })
    }, [offset]);

    return(
        <div className="infinite-wrapper">
            {   
                items.map((e, index) => {
                    if (items.length === index + 1) {
                        return(
                            <div ref={lastElement} key={e.id}>
                                <ItemCardComponent item={e}/>
                            </div>
                        )
                    }

                    return(
                        <div key={e.id}>
                            <ItemCardComponent item={e}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default InfiniteComponent