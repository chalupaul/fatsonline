import { StyleSheet, TextStyle } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Href, Link, LinkComponent } from 'expo-router';
import { Pressable } from 'react-native';

export class Hour {
    date: Date = new Date();
    title?: string;
    title2?: string;
    text?: string;
    prev?: string;
    next?: string;
    prevLink?: LinkComponent;
    nextLink?: LinkComponent;
    

    constructor(date: Date) {
        this.date = date;
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
    const privLink: any = props.hour.makePrev();
    const nextLink: any = props.hour.makeNext();
    return (
        <View style={styles.container}>
        <View style={styles.body}>
            <Text style={styles.title}>{props.hour.title}</Text>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.footer}>
            <View >{privLink !== null && privLink}</View>
            <View></View>
            <View >
                {nextLink !== null && nextLink}
            </View>
        </View>
        </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    body: {
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: '100%',
    },
    footer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 40,
        flexDirection: "row",
        justifyContent: 'space-between',
    }
});