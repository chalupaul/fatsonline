import { Hour } from '@/components/Service';
import HourService from '@/components/Service';

export class Noon extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Noontime Prayers";
      this.title2 = "Noonday Prayer";
      this.prev = "matins";
      this.next = "vespers";
  }
}


export default function Service() {
    const service: Hour = new Noon(new Date());
  return <HourService hour={service} />
}
