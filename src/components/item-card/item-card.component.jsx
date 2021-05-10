import React from 'react';
import moment from 'moment';
import './item-card.style.scss';

const ItemCardComponent = ({item}) => {
    return(
        <div className="item-card">
            <div className="item-detail">
                <span><h3>{item ? item.name : null}</h3></span>
                <span>
                    {
                        item && item.offDay2 ? `Off Days: ${item.offDay1.toUpperCase()} & ${item.offDay2.toUpperCase()}`
                        :
                        `Off Days: ${item.offDay1.toUpperCase()}`
                    }
                </span>
                <span>Open Hours: {item !== null ? moment(item.start_time.substring(0, 2), 'hh').format('LT') : null} ~ {item !== null? moment(item.end_time.substring(0,2), 'hh').format('LT') : null}</span>
            </div>
        </div>
    )
}

export default ItemCardComponent;