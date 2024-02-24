import DocterGrid from "../miniComponents/DocterGrid.jsx";


function  DocterSearch(){


    return <>
        <div className="flex justify-center my-4">
<input className='px-8 w-[50%] py-2 rounded-md border-2' placeholder='search docter' type='text' />
        </div>

        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-10'>
<DocterGrid firstname={'Rushikesh'} lastname={'kale'} rating={'50'} exp={'25'} gender={'male'} medi1={'Md'} rateqty={'10'}></DocterGrid>
<DocterGrid firstname={'Rushikesh'} lastname={'kale'} rating={'43'} exp={'25'} gender={'male'} medi1={'Md'} rateqty={'10'}></DocterGrid>
<DocterGrid firstname={'Rushikesh'} lastname={'kale'} rating={'30'} exp={'25'} gender={'male'} medi1={'Md'} rateqty={'10'}></DocterGrid>
<DocterGrid firstname={'Rushikesh'} lastname={'kale'} rating={'50'} exp={'25'} gender={'male'} medi1={'Md'} rateqty={'10'}></DocterGrid>
<DocterGrid firstname={'Rushikesh'} lastname={'kale'} rating={'50'} exp={'25'} gender={'male'} medi1={'Md'} rateqty={'10'}></DocterGrid>


        </div>
    </>
}
export default DocterSearch