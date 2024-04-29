import { Hour } from '@/components/Service';
import HourService from '@/components/Service';

export class Terce extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Terce";
      this.title2 = "Mid Morning Prayer";
      this.text = "The text of matins. This should be very long.";
      this.prev = "matins";
      this.next = "sext";
  }
}

export default function Service() {
    const service: Hour = new Terce(new Date());
  return <HourService hour={service} />
}
