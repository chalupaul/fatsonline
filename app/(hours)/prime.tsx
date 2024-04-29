import { Hour } from '@/components/Service';
import HourService from '@/components/Service';

export class Prime extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Prime";
      this.title2 = "Early Morning Prayer";
      this.text = "The text of matins. This should be very long.";
      this.next = "matins";
  }
}

export default function Service() {
    const service: Hour = new Prime(new Date());
  return <HourService hour={service} />
}
