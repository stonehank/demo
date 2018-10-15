
let mockData={
    //一
    navList: {
        showingDetail:{mockSection1:true,mockSection2:false,mockSection3:false},
        //2
        isFetching:false,
        //3
        shallowList: [
            {id: 1, name: 'mockSection1'},
            {id: 2, name: 'mockSection2'},
            {id: 3, name: 'mockSection3'}
        ],
        //4
        deepList:{
            mockSection1:[
                {id:1, name:'sec1-detail1'},
                {id:2, name:'sec1-detail2'}
            ],
            mockSection2:[],
            mockSection3:[{id:1,name:'sec3-detail1'}]
        }
    },
    //二
    content:{
        //1
        isFetching:false,
        showPopInform:{},
        //2
        mockSection1:[{isEditing:false, id:1, name:'sec1-detail1', content:'sec1-detail1-content'},
            {isEditing:false, id:2, name:'sec1-detail2', content:'sec1-detail2-content'}],
        //3
        mockSection2:[],
        //4,
        mockSection3:[{isEditing:false, id:1, name:'sec3-detail1', content:'sec3-detail1-content'}]
    },
    search:{
        searchList:false,
        searchValue:''
    }
};

export default mockData;


//state={
//    shallowList:{
//        s1:{id:1,name:'s1'},
//        s2:{id:2,name:'s2'},
//        s3:{id:3,name:'s3'}
//    },
//    deepList:{
//        s1:{
//            s1c1:{id:1,name:"s1c1",content:'s1111111',isEditing:false},
//            s1c2:{id:2,name:"s1c2",content:'s122222',isEditing:false},
//            s1c3:{id:3,name:"s1c3",content:'s1333333',isEditing:false}
//        },
//        s2:{},
//        s3:{
//            s3c1:{id:1,name:'s3c1',content:'s3111111',isEditing:false},
//            s3c2:{id:2,name:'s3c2',content:'s3222222',isEditing:false}
//        }
//    },
//    navListStatus:{
//        showingDetail:{s1:true,s2:false,s3:false},
//        isFetching:false
//    },
//    sectionStatus:{
//        isFetching:false,
//        showPopInform:{}
//    },
//    search:{
//        searchList:false,
//        searchValue:''
//    }
//}