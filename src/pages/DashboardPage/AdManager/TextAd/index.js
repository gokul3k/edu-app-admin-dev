import React from 'react';
import AddTextAdComponent from '../../../../components/AddTextAdComponent';
import AdStudentTable from '../../../../components/tables/AdStudentTable';

export default function TextAd(props) {

    return ( 
        <div>
            <AddTextAdComponent />
            <AdStudentTable />
        </div>
    );
}   