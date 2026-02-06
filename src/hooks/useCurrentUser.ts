import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/services/user.service';

export function useCurrentUser() {
  const { data: user } = useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
  });

  return user;
}