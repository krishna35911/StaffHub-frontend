import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
// first argument should be the item which have to be transformed
//second argument - based on which the transformation have to be done
  transform(allemployee:any[], searchkey:string): any[] {
    const result:any=[]
    if(!allemployee || searchkey==="")
    {
      return allemployee
    }
    allemployee.forEach((item:any)=>
    {
      if(item.name.trim().toLowerCase().includes(searchkey.trim().toLowerCase()))
      {
        result.push(item)
      }
    })
    return result;
  }

}
