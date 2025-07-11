import { StyleSheet, Image, FlatList } from 'react-native';
import { Text, TextProps, View } from '@/components/Themed';
import { Href, Link, LinkComponent } from 'expo-router';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { InLent, InAdvent, In12DaysOfXmas, InEpiphany, ThroughBaptism, IsTransfiguration, UntilAscension, UntilPentecost, AfterPentecost, InHolyWeek, InEastertide, IsEpiphany } from '@/components/Calendar';
import { Entypo } from '@expo/vector-icons';
import { Chapter } from './BiblePlan';
import React from 'react';

export function randstr(prefix: string): string {
    return Math.random().toString(36).replace('0.',prefix + '_' || '');
}

export class Hour {
    date: Date = new Date();
    dayOfWeek: number;
    title?: string;
    text?: JSX.Element;
    prev?: string;
    next?: string;
    prevLink?: LinkComponent;
    nextLink?: LinkComponent;
    antiphon?: React.JSX.Element[];
    canticleAntiphon?: React.JSX.Element;
    versicle?: React.JSX.Element[];
    

    constructor(date: Date) {
        // Advent
        //this.date = new Date('2024-12-02');
        // Lent
        //this.date = new Date('2024-03-10');
        // ps119
        //this.date = new Date('2024-06-25');
        // Other
        //this.date = new Date('2024-05-13T12:01:00'));
        this.date = date;
        this.dayOfWeek = this.date.getDay();

        if (this.inAdvent()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Give glory to the coming King.</LText>,
            <CText key={randstr('antiphon')}>Oh, come let us worship him.</CText>
          ];
          this.versicle = [
            <LText key={randstr('vesperVersicle')}>The Spirit and the Church cry out:</LText>,
            <CText key={randstr('vesperVersicle')}>Come, Lord Jesus.</CText>,
            <LText key={randstr('vesperVersicle')}>All those who await his appearance pray:</LText>,
            <CText key={randstr('vesperVersicle')}>Come, Lord Jesus.</CText>,
            <LText key={randstr('vesperVersicle')}>The whole creation pleads:</LText>,
            <CText key={randstr('vesperVersicle')}>Come, Lord Jesus.</CText>
          ]
          
          if (this.date.getMonth() == 11 && this.date.getDate() == 17) {
            this.canticleAntiphon = (<LText>
              O Wisdom, 
              proceeding from the mouth of the Most High, 
              pervading and permeating all ceration, 
              mightily ordering all things: 
              Come and teach us the way of prudence.
            </LText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 18) {
            this.canticleAntiphon = (<LText>
              O Adonai and ruler of the house of Israel,
              who appeared to Moses in the burning bush
              and gave him the Law on Sinai:
              Come with an outstretched arm and redeem us.
            </LText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 19) {
            this.canticleAntiphon = (<LText>
              O Root of Jesse,
              standing as an ensign before the peoples,
              before whom all kings are mute,
              to whom the nations will do homage:
              Come quickly to deliver us.
            </LText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 20) {
            this.canticleAntiphon = (<LText>
              O Key of David and scepter of the house of Israel,
              you open and no one can close,
              you close and no one can open:
              Come and rescue the prisoners 
              who are in darkness and the shadow of death.
            </LText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 21) {
            this.canticleAntiphon = (<LText>
              O Dayspring,
              splendor of light everlasting:
              Come and enlighten those who sit in darknessand in the shadow of death.
            </LText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 22) {
            this.canticleAntiphon = (<LText>
              O King of the nations,
              the ruler they long for,
              the cornerstone uniting all people:
              Come and save us all, whom you formed out of clay.
            </LText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 23) {
            this.canticleAntiphon = (<LText>
              O Emmanuel,
              our king and our lawgiver,
              the anointed of the nations and their Savior:
              Come and save us,  o Lord our God.
            </LText>)
          } else {
            this.canticleAntiphon = (<LText>
              Fear not Mary, you have found favor with the Lord: Behold, you shall conceive and bear a Son. Alleluia.
            </LText>)
          }
        } else if (this.in12Days() || this.isEpiphany()) {
            this.antiphon = [
                <LText key={randstr('antiphon')}>Alleluia. Unto us a child is born.</LText>,
                <CText key={randstr('antiphon')}>Oh come, let us worship him. Alleluia.</CText>
            ];
            this.versicle = [
                <LText key={randstr('vesperVersicle')}>The people who walked in darkness have seen a great light.</LText>,
                <CText key={randstr('vesperVersicle')}>The light shines in the darkness, and the darkness has not overcome it.</CText>,
                <LText key={randstr('vesperVersicle')}>Those who dwelt in the land of deep darkness, on them has light shined.</LText>,
                <CText key={randstr('vesperVersicle')}>We have beheld Christ's glory, glory as of the only Son from the Father.</CText>,
                <LText key={randstr('vesperVersicle')}>For to us a child is born, to us a Son is given.</LText>,
                <CText key={randstr('vesperVersicle')}>In him was life, and the life was the light of man.</CText>
            ];
          this.canticleAntiphon = (
            <LText>
              Today Christ is born; today salvation has appeared. Today the just exult and say, "Glory to God in the highest."
            </LText>
          );
        } else if (this.isTransfiguration() || this.throughBaptism()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>The Word was made flesh, and we beheld his glory.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
          ];
          this.versicle = [
            <LText key={randstr('vesperVersicle')}>We have seen the light of the world,</LText>,
            <CText key={randstr('vesperVersicle')}>on high mountains of celebration.</CText>,
            <LText key={randstr('vesperVersicle')}>We have seen the Son of God,</LText>,
            <CText key={randstr('vesperVersicle')}>in obedience in the river Jordan.</CText>,
            <LText key={randstr('vesperVersicle')}>In glory Jesus meets us here,</LText>,
            <CText key={randstr('vesperVersicle')}>raising us from the river to bright heights of heavenly glory. </CText>
          ]
          this.canticleAntiphon = (<LText>
            Our Lord and Savior, begotten before all ages, revealed himself to the world. Alleluia.
          </LText>);
        } else if (this.inEpiphany()) {
            this.versicle = [
                <LText key={randstr('vesperVersicle')}>Jesus Christ is the Light of the world,</LText>,
                <CText key={randstr('vesperVersicle')}>the light no darkness can overcome.</CText>,
                <LText key={randstr('vesperVersicle')}>Stay with us, Lord, for it is evening,</LText>,
                <CText key={randstr('vesperVersicle')}>and the day is almost over.</CText>,
                <LText key={randstr('vesperVersicle')}>Let your light scatter the darkness,</LText>,
                <CText key={randstr('vesperVersicle')}>and illumine your Church.</CText>
            ];
            this.antiphon = [
                <LText key={randstr('antiphon')}>Give glory to God, our light and our life.</LText>,
                <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
            ];
          this.canticleAntiphon = (<LText>
            Our Lord and Savior, begotten before all ages, revealed himself to the world. Alleluia.
          </LText>);
        } else if (this.inLent()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>The Lord is near to those who call on him.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
          ];
          this.versicle = [
            <LText key={randstr('vesperVersicle')}>Behold, now is the acceptable time;</LText>,
            <CText key={randstr('vesperVersicle')}>now is the day of salvation.</CText>,
            <LText key={randstr('vesperVersicle')}>Turn us again, O God of our salvation,</LText>,
            <CText key={randstr('vesperVersicle')}>that the light of your face may shine on us.</CText>,
            <LText key={randstr('vesperVersicle')}>May your justice shine like the sun;</LText>,
            <CText key={randstr('vesperVersicle')}>and may the poor be lifted up.</CText>
          ]
          if (this.inHolyWeek()) {
            this.canticleAntiphon = (<LText>
              Glory to the cross of our Lord Jesus Christ, our salvation, life, and resurrection.
            </LText>);
          } else {
            this.canticleAntiphon = (<LText>
              Let justice roll down like water, and righteousness like an overflowing stream.
            </LText>);
          }
        } else if (this.isBeforeAscension()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Alleluia. The Lord is risen indeed.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him. Alleluia.</CText>
          ];
          this.versicle = [
            <LText key={randstr('vesperVersicle')}>Jesus Christ is risen from the dead.</LText>,
            <CText key={randstr('vesperVersicle')}>Alleluia, alleluia, alleluia!</CText>,
            <LText key={randstr('vesperVersicle')}>We are illumined by the brightness of his rising.</LText>,
            <CText key={randstr('vesperVersicle')}>Alleluia, alleluia, alleluia!</CText>,
            <LText key={randstr('vesperVersicle')}>Death has no more dominion over us.</LText>,
            <CText key={randstr('vesperVersicle')}>Alleluia, alleluia, alleluia!</CText>
          ]
          this.canticleAntiphon = (<LText>
            This is the day the Lord has made. Alleluia. Let us rejoice and be glad in it. Alleluia.
          </LText>);
        } else if (this.isBeforePentecost()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Alleluia. Christ the Lord ascends into heaven.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him. Alleluia.</CText>
          ];
          this.versicle = [
            <LText key={randstr('vesperVersicle')}>God of rushing wind, bringing life to this world.</LText>,
            <CText key={randstr('vesperVersicle')}>Pour your Spirit upon us.</CText>,
            <LText key={randstr('vesperVersicle')}>God of fire, warming us with your justice.</LText>,
            <CText key={randstr('vesperVersicle')}>Pour your Spirit upon the nations.</CText>,
            <LText key={randstr('vesperVersicle')}>God of fresh water, springing forth from your Church.</LText>,
            <CText key={randstr('vesperVersicle')}>Pour living water into this thirsty world.</CText>
          ];
          this.canticleAntiphon = (<LText>
            This is the day the Lord has made. Alleluia. Let us rejoice and be glad in it. Alleluia.
          </LText>);
        } else if (this.isAfterPentecost()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Give glory to God, our light and our life.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him. Allelulia.</CText>
          ];
          this.versicle = [
            <LText key={randstr('vesperVersicle')}>Come, let us worship and bow down before God our King.</LText>,
            <CText key={randstr('vesperVersicle')}>Let us kneel before the Lord our God our maker.</CText>,
            <LText key={randstr('vesperVersicle')}>Come, let us worship and bow down before Christ our God and our King.</LText>,
            <CText key={randstr('vesperVersicle')}>Let us enter his gates with thanksgiving.</CText>,
            <LText key={randstr('vesperVersicle')}>Come, let us worship Christ, our King and our God, and bow down before Him.</LText>,
            <CText key={randstr('vesperVersicle')}>Let us enter his courts with praise.</CText>
          ]
          this.canticleAntiphon = (<LText>
            When he ascended on high he led a host of captives, and he gave gifts to men.
          </LText>)
        }
        else {
          this.antiphon = []
          this.canticleAntiphon = <></>
          this.versicle = []
        }
    }

    DaysInMonth() {
        const month = this.date.getMonth() + 1  // Remember indexes start at 0, but months start at 1
        const year = this.date.getFullYear()
        const monthdate = new Date(year, month, 0).getDate();
        return monthdate
    }
    isLeapYear() {
        var year = this.date.getFullYear();
        const sample = new Date(year, 1, 29);
        return sample.getMonth() == 1;
    };
    
    DaysInYear() {
        const year = this.date.getFullYear()
        return this.isLeapYear() ? 366 : 365;
    }
    DayOfYear() {
        var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var mn = this.date.getMonth();
        var dn = this.date.getDate();
        var dayOfYear = dayCount[mn] + dn;
        if(mn > 1 && this.isLeapYear()) dayOfYear++;
        return dayOfYear;
    }

    inLent() {
        return InLent(this.date);
    }

    inHolyWeek() {
        return InHolyWeek(this.date);
    }

    inAdvent() {
        return InAdvent(this.date);
    }

    in12Days() {
        return In12DaysOfXmas(this.date);
    }

    isEpiphany() {
        return IsEpiphany(this.date);
    }

    inEpiphany() {
        return InEpiphany(this.date);
    }

    inEasterTide() {
        return InEastertide(this.date);
    }

    throughBaptism() {
        return ThroughBaptism(this.date);
    }

    isTransfiguration() {
        return IsTransfiguration(this.date);
    }

    isBeforeAscension() {
        return UntilAscension(this.date);
    }

    isBeforePentecost() {
        return UntilPentecost(this.date);
    }

    isAfterPentecost() {
        return AfterPentecost(this.date);
    }

    private _makeLink(hourName: string | undefined, isPrev: boolean) {
        const hrn: string = `${hourName}`.toLowerCase();
        const hrnFixed: string = hrn.charAt(0).toUpperCase() + hrn.slice(1)
        return (
            <Link href={("/(hours)/" + hrn) as Href<string>} replace asChild>
                <Pressable>
                    <Text style={styles.title}>{isPrev && '<'} {hrnFixed} {!isPrev && '>'}</Text>
                </Pressable>
            </Link>
        )
    }

    makeNext() {
        if (this.next === undefined) return null;
        return this._makeLink(this.next, false);
    }

    makePrev() {
        if (this.prev === undefined) return null;
        return this._makeLink(this.prev, true);
    }
}

interface HourServiceProps {
    hour: Hour;
}



export default function HourService(props: HourServiceProps): JSX.Element {
    //const cross = useAssets([require('../assets/images/cross.png')])[0] as ImageSourcePropType;
    const cross = require('../assets/images/luther_rose.png')
    const privLink: any = props.hour.makePrev();
    const nextLink: any = props.hour.makeNext();
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', alignContent: 'center', width: '100%', paddingHorizontal: 15}}>
            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 2.5}}>
                <Link href="/" asChild>
                    <Image style={styles.image} source={cross} resizeMode='contain'/>
                </Link>
            </View>
            <View style={{flex: 1, paddingLeft: 10}}>
                <Text style={styles.title}>{props.hour.title}</Text>
                <Text>{props.hour.date.toLocaleDateString("en-US", dateOptions)}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: .05}}>
                <Link href="/info" asChild>
                    <Pressable>
                        <Entypo name="info-with-circle" size={24} />
                    </Pressable>
                </Link>

            </View>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.body}>
                {props.hour.text}
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.footer}>
                <View style={{paddingBottom: 25}}>{privLink !== null && privLink}</View>
                <View></View>
                <View style={{paddingBottom: 25}}>
                    {nextLink !== null && nextLink}
                </View>
            </View>
        </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    body: {
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'normal',
        paddingTop: 0,
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: '100%',
    },
    footer: {
        flex: 1,
        flexWrap: 'wrap',
        width: '100%',
        paddingHorizontal: 40,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    textHeader: {
        flex: .035
    },
    text: {
        flex: 1, 
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontStyle: 'normal', 
        fontWeight: 'normal'
    },
    image: {
        flex: 1,
        height: 50,
        width: 50,
        /*backgroundColor: '#0553',*/
      },
});

export function Section(props: PropsWithChildren) {
    return (
        <View style={{marginVertical: 10}}>{props.children}</View>
    )
}
export function SectionTitle(props: TextProps): JSX.Element {
    return (
        <Text style={{fontVariant: ['small-caps'], paddingBottom: 5, fontSize: 16}}>{props.children}</Text>
    )
}
export function LText(props:TextProps) {
    return (
        <View>
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>
                    L:
                </Text>
                <Text style={styles.text}>
                    {props.children}
                </Text>
        </View>
    </View>
    )
}

export function CText(props:TextProps) {
    return (
        <View>
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>
                    C:
                </Text>
                <Text style={styles.text}>
                    {props.children}
                </Text>
        </View>
    </View>
    )
}

export function NText(props:TextProps) {
    return (
        <View>
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>
                </Text>
                <Text style={styles.text}>
                    {props.children}
                </Text>
        </View>
    </View>
    )
}

export function TextSpacer() {
    return <View><span>&nbsp;</span></View>
}

type GloryBeProps = {
    inLent: boolean,
    children?: React.ReactNode
}

export function GloryBe(props:GloryBeProps) {
    return (
    <Section>
        <SectionTitle>Gloria Patri</SectionTitle>
        <View>
            <LText>
                Glory be to the Father, and to the Son, and to the Holy Spirit; 
            </LText>
            <CText>
                as it was in the beginning, is now and will be forever. Amen
            </CText>
            {!props.inLent && <View><TextSpacer /><NText>Alleluia! Alleluia!</NText></View>}
        </View>
    </Section>
    )
}

export function Kyrie() {
    return (
        <Section>
            <SectionTitle>Kyrie Eleison</SectionTitle>
            <LText>O Lord,</LText>
            <CText>Have mercy upon us.</CText>
            <TextSpacer />
            <LText>O Christ,</LText>
            <CText>Have mercy upon us.</CText>
            <TextSpacer />
            <LText>O Lord,</LText>
            <CText>Have mercy upon us.</CText>
            <TextSpacer />
            <LText>Help, save, comfort, and defend us, gracious Lord.</LText>
            <CText>Amen.</CText>
        </Section>
    )
}

export function Gloria() {
    return (
        <Section>
            <SectionTitle>Gloria</SectionTitle>
            <LText>Glory to God in the highest!</LText>
            <CText>And on earth peace among those with whom he is pleased!</CText>
        </Section>
    )
}

export function AgnusDei() {
    return (
        <Section>
            <SectionTitle>Agnus Dei</SectionTitle>
            <LText>Lamb of God, you take away the sins of the world.</LText>
            <CText>Grant us peace.</CText>
        </Section>
    )
}

export function Oremus(props:TextProps) {
    const prayerText = props.children == undefined ? "Prayer is Spoken." : props.children
    return (
        <Section>
            <SectionTitle>Oremus</SectionTitle>
            <LText>Let us pray...</LText>
            <TextSpacer />
            <NText><Text style={{fontStyle: "italic"}}>{prayerText}</Text></NText>
        </Section>
    )
}

export type ExamenEntry = {
    key: number
    text: string
}
export function Examen() {
    const steps = [
        {
            key: 1,
            text: "Thank God for His generosity and lavish gifts."
        },
        {
            key: 2,
            text: "Ask Him reveal to you areas where His Spirit is working."
        },
        {
            key: 3,
            text: "Review the actions of your day."
        },
        {
            key: 4,
            text:  "Reflect if the events of today brought you closer or further from God."
        },
        {
            key: 5,
            text: "Think of tomorrow's events and ask God for help in the trials to come."
        }
    ];
    const renderEntry = (item: ExamenEntry) => <Text key={item.key + '-examen'} style={{fontStyle: "italic"}}>{item.key}. {item.text}</Text>
    return (
        <Section>
            <SectionTitle>Oremus</SectionTitle>
            <LText>Let us pray...</LText>
            <TextSpacer />
            <NText>
                <FlatList data={steps} renderItem={({item}) => renderEntry(item)}/>
            </NText>
        </Section>
    )
}

export function Venite() {
    return (
        <Section>
            <SectionTitle>Venite</SectionTitle>
            <CText>
            Oh come, let us sing to the Lord;
            let us make a joyful noise to the rock of our salvation!
            Let us come into his presence with thanksgiving;
            let us make a joyful noise to him with songs of praise!
            For the Lord is a great God,
            and a great King above all gods.
            In his hand are the depths of the earth;
            the heights of the mountains are his also.
            The sea is his, for he made it,
            and his hands formed the dry land.
            </CText>
            <TextSpacer />
            <NText>
            Oh come, let us worship and bow down;
            let us kneel before the Lord, our Maker!
            For he is our God,
            and we are the people of his pasture,
            and the sheep of his hand.
            Today, if you hear his voice,
            do not harden your hearts, as at Meribah,
            as on the day at Massah in the wilderness,
            when your fathers put me to the test
            and put me to the proof, though they had seen my work.
            For forty years I loathed that generation
            and said, “They are a people who go astray in their heart,
            and they have not known my ways.”
            Therefore I swore in my wrath,
            “They shall not enter my rest.”
            </NText>
        </Section>
    )
}

export function VoceMea() {
    return (
        <Section>
            <SectionTitle>Voce Mea Ad Dominum Clamavi</SectionTitle>
            <CText>
                O Lord, I call upon you; hasten to me!
                Give ear to my voice when I call to you!
                Let my prayer be counted as incense before you,
                and the lifting up of my hands as the evening sacrifice!
            </CText>
            <TextSpacer />
            <NText>
                Set a guard, O Lord, over my mouth;
                keep watch over the door of my lips!
                Do not let my heart incline to any evil,
                to busy myself with wicked deeds in company with men who work iniquity,
                and let me not eat of their delicacies!
            </NText>
            <TextSpacer />
            <NText>
                Let a righteous man strike me--it is a kindness;
                let him rebuke me--it is oil for my head;
                let my head not refuse it.
                Yet my prayer is continually against their evil deeds.
                When their judges are thrown over the cliff,
                then they shall hear my words, for they are pleasant.
                As when one plows and breaks up the earth,
                so shall our bones be scattered at the mouth of Sheol.
            </NText>
            <TextSpacer />
            <NText>
                But my eyes are toward you, O God, my Lord;
                in you I seek refuge; leave me not defenseless!
                Keep me from the trap that they have laid for me
                and from the snares of evildoers!
                Let the wicked fall into their own nets,
                while I pass by safely.
            </NText>
        </Section>
    )
}

export function Benedictus() {
    return (
        <Section>
            <CText>
                Blessed be the Lord God of Israel, 
                for he has visited and redeemed his people 
                and has raised up a horn of salvation for us 
                in the house of his servant David, 
                as he spoke by the mouth of his holy prophets from of old, 
                that we should be saved from our enemies 
                and from the hand of all who hate us; 
                to show the mercy promised to our fathers 
                and to remember his holy covenant, 
                the oath that he swore to our father Abraham, to grant us 
                that we, being delivered from the hand of our enemies, 
                might serve him without fear, 
                in holiness and righteousness before him all our days.
            </CText>
            <TextSpacer />
            <NText>
                And you, child, will be called the prophet of the Most High; 
                for you will go before the Lord to prepare his ways, 
                to give knowledge of salvation to his people 
                in the forgiveness of their sins, 
                because of the tender mercy of our God, 
                whereby the sunrise shall visit us from on high 
                to give light to those who sit in darkness and in the shadow of death, 
                to guide our feet into the way of peace. 
            </NText>
        </Section>
    )
}

export function Magnificat() {
    return (
        <Section>
            <CText>
                My soul magnifies the Lord, 
                and my spirit rejoices in God my Savior, 
                for he has looked on the humble estate of his servant. 
                For behold, from now on all generations will call me blessed; 
                for he who is mighty has done great things for me, and holy is his name. 
                And his mercy is for those who fear him from generation to generation. 
                He has shown strength with his arm; 
                he has scattered the proud in the thoughts of their hearts; 
                he has brought down the mighty from their thrones and exalted those of humble estate; 
                he has filled the hungry with good things, and the rich he has sent away empty. 
                He has helped his servant Israel, in remembrance of his mercy, 
                as he spoke to our fathers, to Abraham and to his offspring forever.
            </CText>
        </Section>
    )
}

export function OurFatherText() {
    return (
        <>
        <CText>
            Our Father, who art in heaven, hallowed be thy name.
            Thy kingdom come, thy will be done, on earth as it is in heaven.
            Give us this day our daily bread, and forgive us our tresspasses
            as we forgive those who tresspass against us.
            And lead us not into temptation, but deliver us from evil.
            For thine is the kingdom, and the power, and the glory forever and ever. Amen
        </CText>
        </>
    )
}
export function OurFather() {
    return (
        <Section>
            <SectionTitle>Pater Noster</SectionTitle>
            <LText>Lord, remember us in your kingdom, and teach us to pray:</LText>
            <OurFatherText />
        </Section>
    )
}

export function ApostlesCreed() {
    return (
        <Section>
          <SectionTitle>Apostles Creed</SectionTitle>
          <LText>
            We confess the faith of the Church using the words of the Apostles Creed
          </LText>
          <CText>
            I believe in God, the father almighty, creator of heaven and earth.
          </CText>
          <TextSpacer />
          <NText>
            I believe in Jesus Christ, his only Son, our Lord,
            who was conceived by the Holy Spirit,
            born of the Virgin Mary,
            suffered under Pontius Pilate,
            was crucified, died, and was buried.
            He descended to the dead.
            On the third day he rose again.
            He ascended into heaven.
            He is seated at the right hand of the Father,
            and he will come to judge the living and the dead.
          </NText>
          <TextSpacer />
          <NText>
            I believe in the Holy Spirit,
            the holy catholic church,
            the communion of saints,
            the forgiveness of sins,
            the resurrection of the body,
            and the life everlasting. Amen
          </NText>
        </Section>
    )
}

export function NiceneCreed() {
    return (
        <Section>
            <SectionTitle>Nicene Creed</SectionTitle>
            <LText>
                We confess the faith of our Church using the words of the Nicene Creed:
            </LText>
            <CText>
                I believe in one God, the Father Almighty, maker of heaven and earth and of all things visible and invisible.
            </CText>
            <TextSpacer />
            <NText>
                And in one Lord Jesus Christ, the only-begotten Son of God, begotten of His Father before all worlds, 
                God of God, Light of Light, very God of very God, begotten, not made, being of one substance with the Father, 
                by whom all things were made; who for us men and for our salvation came down from heaven and was incarnate 
                by the Holy Spirit of the virgin Mary and was made man; and was crucified also for us under Pontius Pilate. 
                He suffered and was buried. And the third day He rose again according to the Scriptures and ascended into 
                heaven and sits at the right hand of the Father. And He will come again with glory to judge both the living and the dead, 
                whose kingdom will have no end.
            </NText>
            <TextSpacer />
            <NText>
                And I believe in the Holy Spirit, the Lord and Giver of Life, who proceeds from the Father and the Son, 
                who with the Father and the Son together is worshiped and glorified, who spoke by the prophets. 
                And I believe in one holy Christian and apostolic Church, I acknowledge one Baptism for the remission of sins, 
                and I look for the resurrection of the dead and the life of the world to come. Amen.
            </NText>
        </Section>
    )
}

export function PostPsalmody() {
    return (
        <Section>
            <LText>And I am sure of this, that he who began a good work in you</LText>
            <CText>will bring it to completion at the day of Jesus Christ</CText>
        </Section>
    )
}

export function PostLectionary() {
    return (
        <Section>
            <LText>Long ago, at many times and in many ways, God spoke to our fathers by the prophets.</LText>
            <CText>
                But in these last days he has spoken to us by his Son, whom he appointed the heir of all things, 
                through whom also he created the world.
            </CText>
        </Section>
    )
}

export type ConfiteorProps = {
    day: number
}

export function Confiteor(props: ConfiteorProps) {
    const parts = [
            <React.Fragment key={randstr('confiteor')}>
                <LText>Almighty and most merciful Father,</LText>
                <CText>
                    We have erred and strayed from your ways like lost sheep. We have followed too much the devices and desires of our own hearts. 
                    We have offended against your holy laws. We have left undone those things which we ought to have done, 
                    and we have done those things which we ought not to have done; and apart from your grace, there is no health in us. 
                </CText>
                <LText>O Lord,</LText>
                <CText>
                    Have mercy upon us. Spare all those who confess their faults. Restore all those who are penitent, 
                    according to your promises declared to all people in Christ Jesus our Lord. And grant, O most merciful Father, for his sake, 
                    that we may now live a godly, righteous, and sober life, to the glory of your holy Name. Amen.
                </CText>
            </React.Fragment>,
            <React.Fragment key={randstr('confiteor')}>
                <LText>In Jesus name,</LText>
                <CText>
                    I confess to God Almighty, before the whole company of heaven 
                    and to you, my brothers and sisters, 
                    that I have sinned exceedingly in thought, word, and deed 
                    by my fault, by my own fault, by my own most grievous fault; 
                    wherefore I pray God Almighty to have mercy on me, 
                    forgive me all my sins, and bring me to everlasting life. Amen.
                </CText>
            </React.Fragment>,
            <React.Fragment key={randstr('confiteor')}>
                <LText>Most merciful God,</LText>
                <CText>
                    We confess that we are by nature sinful and unclean. We have sinned against you in thought, word, and deed, 
                    by what we have done and by what we have left undone. We have not loved You with our whole heart; 
                    we have not loved our neighbors as ourselves. We justly deserve Your present and eternal punishment. 
                    For the sake of Your Son, Jesus Christ, have mercy on us. Forgive us, renew us, and lead us, 
                    so that we may delight in Your will and walk in Your ways to the glory of your Holy Name. Amen.
                </CText>
            </React.Fragment>
    ]
    const sunday = (
        <React.Fragment key={randstr('confiteor')}>
            <LText>O Lord our God,</LText>,
            <CText>
                We confess that we have sinned against You in thought, word and deed. We have also omitted to do what Your holy law requires of us. 
                But now with repentance and contrition we turn again to Your love and mercy. 
                We entreat You to forgive us our transgression and to cleanse us from all sin. 
                Lord, fill our heart with the light of Your truth. Strengthen our will by Your grace. 
                Teach us both to desire and to do only what pleases You. Amen.
            </CText>
        </React.Fragment>
    )
    const days = [sunday, ...parts, ...parts]
    const contents = days[props.day]
    return (
        <Section>
            <SectionTitle>Confiteor</SectionTitle>
            <NText><Text style={{fontStyle: "italic"}}>Silence for Self-Examination.</Text></NText>
            <TextSpacer />
            {contents}
        </Section>
    )
    
}

export type VerseTextProps = {
    text: string[]
}

export type VerseTitleProps = {
    text: string
}

export function VerseText(props: VerseTextProps) {
    return (
        <NText>
            {props.text.join(" ").replace('- ','-')}
        </NText>
    )
}

export function VerseTitle(props: VerseTitleProps) {
    return (
        <Section>
            <NText>
                <Text style={{fontStyle: "italic"}}>{props.text}</Text>
            </NText>
        </Section>
    )
}

export type PsalmodyProps = {
    psalmReading: Chapter[]
}

export function Psalmody(props: PsalmodyProps) {
    return (
        <Section>
            {
              props.psalmReading.map((v: Chapter,i) => {
                const psalmName = `${v.bookName.slice(0,-1)} ${v.chapter}`
                return (
                  <View key={randstr('psalm')}>
                    <Section>
                        <VerseTitle text={psalmName}/>
                        <VerseText text={v.text} />
                    </Section>
                  </View>
                )
              })
            }
          </Section>
    )
}

export type LectioProps = {
    verse: string
    text: Chapter[]
}

export function Lectio(props: LectioProps) {
    return (
        <Section>
            <SectionTitle>Lectio</SectionTitle>
                <VerseTitle text={props.verse}/>
            {
                props.text.map((v: Chapter) => {
                return (
                    <View key={randstr('lectio')}>
                        <VerseText text={v.text}/>
                    </View>
                )
                })
            }
        </Section>
    )
}