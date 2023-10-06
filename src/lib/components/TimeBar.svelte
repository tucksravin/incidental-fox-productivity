<script lang='ts'>
  import { reauthenticateWithCredential } from "firebase/auth";

  
  
  type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

    type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>



    type TimeChunk = {
        name: string,
        project: string,
        color: string,
        start: IntRange<0,49>,
        end: IntRange<1,51>
    }

    const testData:TimeChunk[] = [
        {
            name: 'a',
            project: 'climbing',
            color: 'red',
            start: 3,
            end: 30
        },
        {
            name: 'a',
            project: 'climbing',
            color: 'blue',
            start: 0,
            end: 3
        },
        {
            name: 'a',
            project: 'climbing',
            color: 'blue',
            start: 30,
            end: 31
        },
        {
            name: 'a',
            project: 'climbing',
            color: 'green',
            start: 31,
            end: 50
        },


    ] 
  
   export let timeChunks:TimeChunk[] = testData;

   function chunksByStart(a:TimeChunk, b:TimeChunk){
    if(a.start<b.start)
        return 1;

    if(a.start>b.start)
        return -1;

        return 0;

   }

   //puts earlier chunks on top of later chunks 
   timeChunks.sort(chunksByStart)
  
  </script>
  
<div class="w-full h-full relative rounded-full overflow-hidden border-slate-600 border-2 bg-slate-400">
    {#each timeChunks as chunk}
        <!--white backing element so hover doesn't show overlap with otther entries-->
        <div 
            class= "w-full absolute rounded-full"
            style= "
                height: {((chunk.end-chunk.start+2.1)*2)}%;
                background-color: white;
                top: {(chunk.start-2)*2}%;
                "
            >
        </div>

        <div 
            class= "w-full absolute rounded-full hover:opacity-70 cursor-pointer"
            data-tip="{chunk.name}, {chunk.project}"
            style= "
                height: {((chunk.end-chunk.start+2.1)*2)}%;
                background-color: {chunk.color};
                top: {(chunk.start-2)*2}%;
                "
            >
        </div>
        
    {/each}
</div>