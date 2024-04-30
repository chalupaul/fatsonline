import { Hour, Versicle } from '@/components/Service';
import HourService from '@/components/Service';


export class Matins extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Morning Prayer";
      this.text = <Versicle />
      this.prev = "prime";
      this.next = "terce";
  }
}

export default function Service() {
    const service: Hour = new Matins(new Date());
  return <HourService hour={service} />
}