export async function register(data: any) {                     // FIX THIS TYPE!!!
	const { name, password } = data;
	const staff = await StaffRepository.findByName(name);
	if (staff) throw error("Name already in use");
	const hashed = await hashPassword(password);
	return StaffRepository.create({
		name,
		hashedPassword: hashed,
	});
}