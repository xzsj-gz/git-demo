
// f1(); 
/* 在这个位置 f1这个函数没有调用，那么 b 和 c 目前是不存在的，还没有生成这两个变量。 */
console.log(c); // 报错(c is not defined  )
console.log(b); // 报错(b is not defined  )
console.log(a); // 报错(a is not defined  )

function f1(){ 
	var a=b=c=2 
  console.log(a); // 输出 2
  console.log(b); // 输出 2
  console.log(c); // 输出 2
}
async getSelectList(){
      // 存储所有http请求
      let reqList = []
      console.log(reqList);
      // 存储res
      let resList = []
      console.log(resList);

      // 存储后台响应每个请求后的返回结果
      let resData = []
      // console.log( '222222222222',resData);
      // console.log(resData[1]);

      let params = ['/company/querryAll','/company/querryPersonnelScope',
      '/company/querryPersonnelSubScope','/company/querrySalary','/company/querryStaffGroup','/company/querryStaffSubGroup','/company/querryPosition2']

      for (let i = 0; i < params.length; i++) {
      	let req = qrSelectInfo(params[i]).catch(error => console.log('请求出错', error))
      	reqList.push(req)
      	resList.push(('res' + (i + 1)).replace(/[']+/g, ''))
      }
      return await this.$axios.all(reqList).then(this.$axios.spread((...resList) => {
      // console.log(resList[0].data);
      // if (resList.length)
	      for (let i = 0; i < resList.length; i++) {
		        // console.log(resList[i].data);
		        resData.push(resList[i].data.data)
		    }
	      // this.selectInfo = resData
	      // return  this.selectInfo = resData[0]
	      this.selectInfo.companyCodeList = resData[0]
	      this.selectInfo.personnelScopeList = resData[1]
	      this.selectInfo.personnelSubScopList = resData[2]
	      this.selectInfo.salaryRangeList = resData[3]
	      this.selectInfo.staffGroupList = resData[4]
	      this.selectInfo.staffSubGroupList = resData[5]
	      this.selectInfo.positionList = resData[6]
	  }))
  },

