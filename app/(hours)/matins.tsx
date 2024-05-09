import { ProduceCalendar, MakeReadingTitles, Chapter } from '@/components/BiblePlan';
import { AText, Benedictus, CText, GloryBe, Hour, LText, NText, OurFather, Section, SectionTitle, TextSpacer, Venite, randstr } from '@/components/Service';
import HourService from '@/components/Service';
import { View, Text } from '@/components/Themed';
import { psalms2readings, OTNT } from '@/constants/BibleInfo';


export class Matins extends Hour {
  constructor(date: Date) {
      //super(new Date('2024-05-18T12:01:00'));
      super(date);
      this.title = "Morning Prayer";
      this.next = "noon";

      // -1 for index starting at 0, -1 for the morning reading.
      const psalmReading = ProduceCalendar(this.DaysInMonth() * 2, psalms2readings)[this.date.getUTCDate() * 2 - 2];
      const psalmReadingTitle = MakeReadingTitles(psalmReading);
      const dailyReading = ProduceCalendar(this.DaysInYear(), OTNT)[this.DayOfYear() - 1]; 
      const dailyReadingTitle = MakeReadingTitles(dailyReading);

      const prayer = this.date.getDay() != 0 ? <NormalPrayer /> : <SundayPrayer />

      let antiphon: React.JSX.Element[];
      let canticleAntiphon: React.JSX.Element;
      if (this.inAdvent()) {
        antiphon = [
          <LText key={randstr('antiphon')}>Give glory to the coming King.</LText>,
          <CText key={randstr('antiphon')}>Oh, come let us worship him.</CText>
        ];
        if (this.date.getMonth() == 11 && this.date.getDate() == 17) {
          canticleAntiphon = (<CText>
            O Wisdom, 
            proceeding from the mouth of the Most High, 
            pervading and permeating all ceration, 
            mightily ordering all things: 
            Come and teach us the way of prudence.
          </CText>)
        } else if (this.date.getMonth() == 11 && this.date.getDate() == 18) {
          canticleAntiphon = (<CText>
            O Adonai and ruler of the house of Israel,
            who appeared to Moses in the burning bush
            and gave him the Law on Sinai:
            Come with an outstretched arm and redeem us.
          </CText>)
        } else if (this.date.getMonth() == 11 && this.date.getDate() == 19) {
          canticleAntiphon = (<CText>
            O Root of Jesse,
            standing as an ensign before the peoples,
            before whom all kings are mute,
            to whom the nations will do homage:
            Come quickly to deliver us.
          </CText>)
        } else if (this.date.getMonth() == 11 && this.date.getDate() == 20) {
          canticleAntiphon = (<CText>
            O Key of David and scepter of the house of Israel,
            you open and no one can close,
            you close and no one can open:
            Come and rescue the prisoners 
            who are in darkness and the shadow of death.
          </CText>)
        } else if (this.date.getMonth() == 11 && this.date.getDate() == 21) {
          canticleAntiphon = (<CText>
            O Dayspring,
            splendor of light everlasting:
            Come and enlighten those who sit in darknessand in the shadow of death.
          </CText>)
        } else if (this.date.getMonth() == 11 && this.date.getDate() == 22) {
          canticleAntiphon = (<CText>
            O King of the nations,
            the ruler they long for,
            the cornerstone uniting all people:
            Come and save us all, whom you formed out of clay.
          </CText>)
        } else if (this.date.getMonth() == 11 && this.date.getDate() == 23) {
          canticleAntiphon = (<CText>
            O Emmanuel,
            our king and our lawgiver,
            the anointed of the nations and their Savior:
            Come and save us,  o Lord our God.
          </CText>)
        } else {
          canticleAntiphon = (<CText>
            Fear no,t Mary, you have found favor with the Lord: Behold, you shall conceive and bear a Son. Alleluia.
          </CText>)
        }
      } else if (this.in12Days()) {
        antiphon = [
          <LText key={randstr('antiphon')}>Alleluia. Unto us a child is born.</LText>,
          <CText key={randstr('antiphon')}>Oh come, let us worship him. Alleluia.</CText>
        ];
        canticleAntiphon = (
          <CText>
            Today Christ is born; today salvation has appeared. Today the just exult and say, "Glory to God in the highest."
          </CText>
        )
      } else if (this.isTransfiguration() || this.throughBaptism()) {
        antiphon = [
          <LText key={randstr('antiphon')}>The Word was made flesh, and we beheld his glory.</LText>,
          <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
        ];
        canticleAntiphon = (<CText>
          Our Lord and Savior, begotten before all ages, revealed himself to the world. Alleluia.
        </CText>);
      } else if (this.inEpiphany()) {
        antiphon = [
          <LText key={randstr('antiphon')}>Give glory to God, our light and our life.</LText>,
          <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
        ];
        canticleAntiphon = (<CText>
          Our Lord and Savior, begotten before all ages, revealed himself to the world. Alleluia.
        </CText>);
      } else if (this.inLent()) {
        antiphon = [
          <LText key={randstr('antiphon')}>The Lord is near to those who call on him.</LText>,
          <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
        ];
        if (this.inHolyWeek()) {
          canticleAntiphon = (<CText>
            Glory to the cross of our Lord Jesus Christ, our salvation, life, and resurrection.
          </CText>);
        } else {
          canticleAntiphon = (<CText>
            Let justice roll down like water, and righteousness like an overflowing stream.
          </CText>);
        }
      } else if (this.isBeforeAscension()) {
        antiphon = [
          <LText key={randstr('antiphon')}>Alleluia. The Lord is risen indeed.</LText>,
          <CText key={randstr('antiphon')}>Oh, come, let us worship him. Alleluia.</CText>
        ];
        canticleAntiphon = (<CText>
          This is the day the Lord has made. Alleluia. Let us rejoice and be glad in it. Alleluia.
        </CText>);
      } else if (this.isBeforePentecost()) {
        antiphon = [
          <LText key={randstr('antiphon')}>Alleluia. Christ the Lord ascends into heaven.</LText>,
          <CText key={randstr('antiphon')}>Oh, come, let us worship him. Alleluia.</CText>
        ];
        canticleAntiphon = (<CText>
          This is the day the Lord has made. Alleluia. Let us rejoice and be glad in it. Alleluia.
        </CText>);
      } else if (this.isAfterPentecost()) {
        antiphon = [
          <LText key={randstr('antiphon')}>Give glory to God, our light and our life.</LText>,
          <CText key={randstr('antiphon')}>Oh, come, let us worship him. Allelulia.</CText>
        ];
        canticleAntiphon = (<CText>
          When he ascended on high he led a host of captives, and he gave gifts to men.
        </CText>)
      }
      else {
        antiphon = []
        canticleAntiphon = <View></View>
      }

      this.text = (
        <View style={{paddingBottom: 20}}>
          <Section>
            <SectionTitle>Versicle</SectionTitle>
            <LText>Oh Lord, open my lips,</LText>
            <CText>and my mouth shall declare your praise.</CText>
          </Section>
            <GloryBe>{!this.inLent() && <AText>Alleluia! Alleluia!</AText>}</GloryBe>
          <Section>
            <SectionTitle>Antiphon</SectionTitle>
            {antiphon}
          </Section>
          <Venite />
          <GloryBe />
          <Section>
            <SectionTitle>Antiphon Repeated</SectionTitle>
          </Section>
          <Section>
            <SectionTitle>Psalms</SectionTitle>
            <Text>{psalmReadingTitle.includes('-') ? psalmReadingTitle : psalmReadingTitle.replace('Psalms', 'Psalm')}</Text>
            {
              psalmReading.map((v: Chapter,i) => {
                let final = i != psalmReading.length - 1 ? <TextSpacer /> : <View />;
                return (
                  <View key={randstr('psalm')}>
                    <Section>
                      <NText>{v.bookName.slice(0,-1)} {v.chapter}</NText>
                    </Section>
                    <NText>{v.text}</NText>
                    {final}
                  </View>
                )
              })
            }
          </Section>
          <Section>
            <LText>O Lord, have mercy upon us.</LText>
            <CText>Amen.</CText>
          </Section>
          <Section>
            <SectionTitle>Lectio </SectionTitle>
            <Text>{dailyReadingTitle}</Text>
              {
                dailyReading.map((v: Chapter, i) => {
                  return (
                    <View key={randstr('lectio')}>
                      <Section>
                        <NText>{v.text}</NText>
                      </Section>
                    </View>
                  )
                })
              }
          </Section>
          <Section>
            <LText>In many and various ways God spoke to his people of old by the prophets.</LText>
            <CText>But now in these last days he has spoken to us by his Son.</CText>
          </Section>
          <Section>
            <SectionTitle>Benedictus Antiphon</SectionTitle>
            {canticleAntiphon}
          </Section>
          <Benedictus />
          <Section>
            <SectionTitle>Benedictus Antiphon Repeated</SectionTitle>
          </Section>
          <GloryBe />
          {prayer}
          <Section>
            <SectionTitle>Benediction</SectionTitle>
            <LText>Let us bless the Lord.</LText>
            <CText>Thanks be to God.</CText>
            <TextSpacer />
            <LText>The Lord almighty bless us, and direct our days and our deeds in his peace.</LText>
            <CText>Amen.</CText>
          </Section>
        </View>
    )
  }
}

export default function Service() {
    const service: Hour = new Matins(new Date());
  return <HourService hour={service} />
}

function NormalPrayer(){
  return (
    <>
    <Section>
      <SectionTitle>Prayer of the Day</SectionTitle>
      <LText><Text style={{fontStyle: "italic"}}>The Prayer of the Day is Said.</Text></LText>
      <CText>Amen.</CText>
      <TextSpacer />
      <LText>
        O Lord, almighty and everlasting God, you have brought us in safety to this new day; 
        Preserve us with your mighty power, that we may not fall into sin, nor be overcome 
        in adversity, and in all we do, direct us to the fulfilling of your purpose; 
        through Jesus Christ our Lord.
      </LText>
      <CText>Amen.</CText>
    </Section>
    <OurFather />
    </>
  )
}

function SundayPrayer() {
  return (
    <>
      <Section>
        <SectionTitle>Prayer of the Day</SectionTitle>
        <LText><Text style={{fontStyle: "italic"}}>The Prayer of the Day is Said.</Text></LText>
        <CText>Amen.</CText>
      </Section>
      <Section>
        <SectionTitle>Paschal Blessing</SectionTitle>
        <LText>As many as have been baptized into Christ have put on Christ.</LText>
        <CText>Amen.</CText>
        <TextSpacer />
        <LText>
        But on the first day of the week, at early dawn, they went to the tomb, taking the spices they had prepared. 
        And they found the stone rolled away from the tomb, 
        but when they went in they did not find the body of the Lord Jesus. 
        While they were perplexed about this, behold, two men stood by them in dazzling apparel. 
        And as they were frightened and bowed their faces to the ground, the men said to them, “Why do you seek the living among the dead? 
        He is not here, but has risen. Remember how he told you, while he was still in Galilee, 
        that the Son of Man must be delivered into the hands of sinful men and be crucified and on the third day rise.”
        </LText>
      </Section>
      <Section>
        <SectionTitle>Te Deum</SectionTitle>
        <AText>
          You are God; we praise you. You are the Lord; we acclaim you.
          You are the eternal Father; all creation worships you.
          To you all angels, all the powers of heaven, cherubim and seraphim, sing in endless praise:
          Holy, holy, holy Lord, God of power and might, heaven and earth are full of your glory.
          The glorious company of apostles praise you.
          The noble fellowship of prophets praise you.
          The white-robed army of martyrs praise you.
          Throughout the world the holy Church acclaims you:
          Father, of majesty unbounded;
          your true and only Son, worthy of all worship;
          and the Holy Spirit, advocate and guide.
          You, Christ, are the king of glory, the eternal Son of the Father.
          When you became man to set us free,
          you did not spurn the virgin's womb.
          You overcame the sting of death,
          and opened the kingdom of heaven to all believers.
          You are seated at God's right hand in glory.
          We believe that you will come and be our judge.
          Come, then, Lord, and help your people,
          bought with the price of your own blood,
          and bring us with your saints to glory everlasting.
        </AText>
        <LText>
          O God, for our redemption you gave your only Son to suffer death on the cross, 
          and by his glorious resurrection you delivered us from the power of death. 
          Make us die every day to sin so that we may rise to live with Christ forever; 
          who lives and reigns with you and the Holy Spirit, one God, now and forever.
        </LText>
        <CText>Amen.</CText>
      </Section>
    </>
  )
}