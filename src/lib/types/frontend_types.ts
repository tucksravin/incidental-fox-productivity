export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
? Acc[number]
: Enumerate<N, [...Acc, Acc['length']]>

  type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>



  export type TimeChunk = {
      name: string,
      project: string,
      color: string,
      start: number,
      end: number,
      active: boolean,
      id: string
  }