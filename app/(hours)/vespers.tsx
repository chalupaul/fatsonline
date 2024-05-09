import { Hour } from '@/components/Service';
import HourService from '@/components/Service';


export class Vespers extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Evening Prayer";
      this.title2 = "Evening Prayer";
      this.prev = "noon";
      this.next = "compline";
  }
}

export default function Service() {
    const service: Hour = new Vespers(new Date());
  return <HourService hour={service} />
}
