

const menu = [
    {
        name: 'Home',
        to: '/'
    },
    {
        name: 'About',
        to: '/about'
    },
    {
        name: 'SignUp',
        to: '/auth/signup'
    },
    {
        name: 'Login',
        to: '/auth/login'
    }
]

export default function Header() {
    return (
        <div>
            <ul className="flex gap-4">
                {menu.map((item) => (
                    <li key={item.name} className="text-blue-500 test-semibold text-2xl hover:text-blue-700">
                        <a href={item.to}>{item.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
