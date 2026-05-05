import bcrypt from 'bcryptjs'

// Inicijalni operateri s hashiranim lozinkama
// Lozinka za sve: "Akigoto123!"
const hashiranaLozinka = bcrypt.hashSync('Akigoto123!', 10)

export const operateri = [
    {
        sifra: 1,
        email: 'admin@akigoto.hr',
        lozinka: hashiranaLozinka,
        uloga: 'admin'
    },
    {
        sifra: 2,
        email: 'operater@akigoto.hr',
        lozinka: hashiranaLozinka,
        uloga: 'korisnik'
    }
]

export default {
    operateri
}