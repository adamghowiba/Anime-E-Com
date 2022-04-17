export interface NavbarLink {
	name: string;
	href: string;
}

export interface NavbarDropdown {
	name: string;
	links: NavbarLink[];
}

export interface NavbarLinks {
	name: string;
	href: string;
	dropdown?: NavbarDropdown[];
}

/* 
Aggretsuko
Attack on Titan
Avatar: The Last Airbender
Bananya
Beastars
Berserk
Beyblade
Black Clover
Bleach
Burn the Witch
Cardcaptor Sakura
Castlevania
Cowboy Bebop
Crunchyroll
Demon Slayer
Digimon
_
Dragon Ball GT
Dragon Ball Super
Dragon Ball Z
Dr Stone
Evangelion
Fire Force
Full Metal Alchemist
Funimation
Goblin Slayer
Godzilla
Gloomy Bear
Gundam
Gundam x Hello Kitty
Haikyu!!
Hatsune Miku
Hunter x Hunter
_
Inuyasha
JoJo's Bizarre Adventure
Jujutsu Kaisen
Keep Your Hands Off Eizouken!
Kill La Kill
Lupin
Mob Psycho
My Hero Academia
My Hero X Hello Kitty & Friends
Naruto
Nuki Collection
One Piece
Outlaw Star
Pokémon
_
Promare
Re:Zero
Rilakkuma
Robotech
RWBY
Shield Hero
Slime
Soul Eater
Sword Art Online
The Promised Neverland
The God of High School
Tokyo Ghoul
Tokyo Revengers
Tower of God
Ultraman
Yu-Gi-Oh!
Yu Yu Hakusho
*/

export const NAVBAR_LINKS: NavbarLinks[] = [
	{
		name: 'shop',
		href: '',
		dropdown: [
			{
				name: 'trending',
				links: [
					{ name: 'All products', href: '/collections/all-products' },
					{ name: 'New releases', href: '/collections/new-releases' },
					{ name: 'Best sellers', href: '' }
				]
			},
			{
				name: 'products',
				links: [
					{ name: 'T-shirts', href: '/collections/t-shirts' },
					{ name: 'Hoodies', href: '/collections/hoodies' },
					{ name: 'Long Sleeves', href: '/' },
					{ name: 'Jackets', href: '/' },
					{ name: 'Bottoms', href: '/' }
				]
			},
			{
				name: 'Featured Collections',
				links: [
					{ name: 'Berserk', href: '/' },
					{ name: 'Black Clover', href: '/' },
					{ name: 'Demon Slayer', href: '/' },
					{ name: 'Dragon Ball Z', href: '/' },
					{ name: 'Hunter x Hunter', href: '/' }
				]
			}
		]
	},
	{
		name: 'brands',
		href: '',
		dropdown: [
			{
				name: 'All Brands',
				links: [
					{ name: 'Attack on titan', href: '/' },
					{ name: 'Death Note', href: '/' },
					{ name: 'Bleach', href: '/' },
					{ name: 'Demon Slayer', href: '/' },
					{ name: 'Dragon Ball Z', href: '/' },
					{ name: 'Benanya', href: '/' }
				]
			},
			{
				name: '',
				links: [
					{ name: 'Hunter x Hunter', href: '/' },
					{ name: 'My Hero Academia', href: '/' },
					{ name: 'Naruto Shippuden', href: '/' },
					{ name: 'One Piece', href: '/' },
					{ name: 'One Punch Man', href: '/' },
					{ name: 'The Promised Neverland', href: '/' }
				]
			},
            {
				name: '',
				links: [
					{ name: 'Re:Zero', href: '/' },
					{ name: 'Rilakkuma', href: '/' },
					{ name: 'Robotech', href: '/' },
					{ name: 'RWBY', href: '/' },
					{ name: 'Slime', href: '/' },
					{ name: 'Soul Eater', href: '/' }
				]
			}

		]
	},
	{
		name: 'about',
		href: '/about'
	}
];
